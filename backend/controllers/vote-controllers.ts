import { prisma } from "../app";
import { Verify } from "../utils/utils";

// situation
/**
1. user vote - done (use token to verify)
2. guest vote (use nickname to verify, and no guestid -> create new guest)
3. guest update vote by user (use guestid to verify)
4. guest update vote by guest (use guestid to verify)
 */
export const CreateVote = async (req: any, res: any) => {
  try {
    const { timeslots, partyid, nickname, guestid } = await req.body;

    if (!timeslots || !partyid) {
      throw new Error("請提供所有必要資訊");
    }

    let user = null;
    let newVote;

    // 1. Guest Update Vote by Guest or User (with guestid)
    if (guestid) {
      // check if guestid is valid
      user = await prisma.user.findFirst({
        where: { id: guestid, role: "GUEST" },
      });

      if (!user) throw new Error("這是一位無效的訪客或是已登入的用戶！");

      // 2. Check for token (User Vote)
    } else if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded: any = await Verify(token);

      if (decoded) {
        user = await prisma.user.findFirst({
          where: { id: decoded.id },
        });

        if (!user) throw new Error("使用者不存在！");
      } else {
        throw new Error("未授權用戶！");
      }

      // 3. Guest Vote (with nickname, create new guest if no guestid)
    } else if (nickname) {
      user = await prisma.user.findFirst({
        where: { nickname },
      });

      if (!user) {
        // Create new guest user
        user = await prisma.user.create({
          data: {
            nickname,
            email: "guest",
            username: nickname,
            password: "guest",
            role: "GUEST",
          },
        });
      }
    } else {
      throw new Error("未授權用戶！");
    }

    const voteData = {
      creatorName: user.nickname || nickname,
      partyid,
      userId: user.id,
    };

    // Check if user has already voted
    const oldVote = await prisma.votetime.findFirst({
      where: { partyid, userId: user.id },
    });

    if (oldVote) {
      // update vote
      await prisma.timeSlot.deleteMany({
        where: { votetimeId: oldVote.id },
      });

      newVote = await prisma.votetime.update({
        where: { id: oldVote.id },
        data: {
          ...voteData,
          timeslots: {
            create: timeslots.map((ts: any) => ({
              date: ts.date,
              start_time: ts.start_time,
              start_ampm: ts.start_ampm,
              end_time: ts.end_time,
              end_ampm: ts.end_ampm,
            })),
          },
        },
      });
    } else {
      // create new vote
      newVote = await prisma.votetime.create({
        data: {
          ...voteData,
          timeslots: {
            create: timeslots.map((ts: any) => ({
              date: ts.date,
              start_time: ts.start_time,
              start_ampm: ts.start_ampm,
              end_time: ts.end_time,
              end_ampm: ts.end_ampm,
            })),
          },
        },
      });
    }

    if (!newVote) throw new Error("投票失敗！");

    res.status(200).json({ newVote });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const GetVoteTimes = async (req: any, res: any) => {
  try {
    const { partyid } = await req.query;

    if (!partyid) {
      throw new Error("請提供所有必要資訊");
    }

    const votes = await prisma.votetime.findMany({
      where: {
        partyid: partyid,
      },
      include: {
        timeslots: true,
      },
    });

    res.status(200).json(votes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const DeleteVote = async (req: any, res: any) => {
  try {
    const { partyid, userid } = await req.params;
    const token: string | undefined = req.headers.authorization?.split(" ")[1];

    if (!userid || !partyid) {
      throw new Error("請提供所有必要資訊");
    }

    let guest = await prisma.user.findFirst({
      where: { id: userid, role: "GUEST" },
    });

    if (guest) {
      const vote = await prisma.votetime.findFirst({
        where: { partyid, userId: userid },
      });
      if (!vote) throw new Error("投票不存在");

      const deletedVote = await prisma.votetime.delete({
        where: { id: vote.id },
      });

      if (!deletedVote) throw new Error("刪除失敗！");

      res.sendStatus(200);
    } else {
      if (!token) throw new Error("你尚未登入");

      const decoded: any = await Verify(token);
      if (!decoded || decoded.id !== userid) throw new Error("未授權用戶");

      const vote = await prisma.votetime.findFirst({
        where: { partyid, userId: userid },
      });
      if (!vote) throw new Error("投票不存在");

      const deletedVote = await prisma.votetime.delete({
        where: { id: vote.id },
      });

      if (!deletedVote) throw new Error("刪除失敗！");

      res.sendStatus(200);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
