import { prisma } from "..";

export const DecideSchedule = async (req: any, res: any) => {
  try {
    const { partyid, timeslot } = await req.body;

    if (!partyid || !timeslot) {
      throw new Error("請提供正確的登記資訊！");
    }

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
    });

    if (!scheduled_party) {
      throw new Error("登記失敗！");
    }

    res.sendStatus(200);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const DeleteSchedule = async (req: any, res: any) => {
  try {
    const { partyid } = await req.params;

    if (!partyid) {
      throw new Error(
        "派對不存在！"
      );
    }

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

    res.sendStatus(200);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
