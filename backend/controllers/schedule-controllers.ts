import { prisma } from "../db";

const formatTime = (date: Date, time: number, ampm: "AM" | "PM") => {
  if (time >= 12 && ampm === "AM") time -= 12;
  else if (time < 12 && ampm === "PM") time += 12;

  if (time % 1 !== 0)
    return `${date}T${Math.floor(time).toString().padStart(2, "0")}:30:00`;
  else return `${date}T${time.toString().padStart(2, "0")}:00:00`;
};

export const DecideSchedule = async (req: any, res: any, next: any) => {
  try {
    const { partyid, timeslot } = await req.body;

    if (!partyid || !timeslot) throw new Error("請提供正確的登記資訊！");

    // update party status and add decision
    const scheduled_party = await prisma.party.update({
      where: { partyid: partyid },
      data: {
        status: true,
        decision: {
          create: {
            ...timeslot,
          },
        },
      },
      include: {
        decision: true,
      },
    });

    if (!scheduled_party) throw new Error("登記失敗！");

    // get creator's refresh_token of the party
    const creator = await prisma.user.findUnique({
      where: { id: scheduled_party.userId },
      select: { googleId: true, refreshToken: true },
    });

    // using GitHub Oauth to login, don't need to create event on google calendar
    if (creator?.googleId === null) {
      return res.status(200).json({ message: "登記成功！" });
    }

    // using Google Oauth to login
    const refresh_token = creator?.refreshToken;
    if (!refresh_token) throw new Error("請重新登入以刷新Token！");

    // get userId from votetime
    const userId: string[] = await prisma.votetime
      .findMany({
        where: { partyid: partyid },
        select: {
          userId: true,
        },
      })
      .then((res) => res.map((user) => user.userId));

    // get email from userId
    const invited_lists = await prisma.user
      .findMany({
        where: {
          id: { in: userId },
        },
        select: { email: true },
      })
      .then((res) => res.map((user) => user.email));

    // format time
    const start = formatTime(
      timeslot.date,
      timeslot.start_time,
      timeslot.start_ampm
    );
    const end = formatTime(timeslot.date, timeslot.end_time, timeslot.end_ampm);

    // set req.body to pass to create event on google calendar
    req.body = {
      refresh_token: refresh_token,
      summary: scheduled_party.title,
      description: scheduled_party.description,
      start: start,
      end: end,
      invited_lists: invited_lists,
      partyid,
    };

    next();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const DeleteSchedule = async (req: any, res: any, next: any) => {
  try {
    const { partyid } = req.params;

    if (!partyid) {
      throw new Error("派對不存在！");
    }

    // get party and decision
    const party = await prisma.party.findUnique({
      where: { partyid: partyid },
      include: { decision: true },
    });

    if (!party) {
      throw new Error("派對不存在！");
    }

    
    // get creator's googleId and refreshToken
    const creator = await prisma.user.findUnique({
      where: { id: party.userId },
      select: { googleId: true, refreshToken: true },
    });
    
    req.body = {
      eventId: party.decision?.eventId,
      refresh_token: creator?.refreshToken
    };

    // update party status and add decision
    const deleted_party = await prisma.party.update({
      where: { partyid: partyid },
      data: {
        status: false,
        decision: {
          delete: true,
        },
      },
    });

    if (!deleted_party) {
      throw new Error("刪除失敗！");
    }

    // using GitHub Oauth to login, don't need to delete event on google calendar
    if (creator?.googleId && req.body.refresh_token && req.body.eventId) {
      return next();
    }

    res.sendStatus(200);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
