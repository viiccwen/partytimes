import { prisma } from "..";

export const DecideSchedule = async (req: any, res: any) => {
  try {
    const { partyid, timeslot } = await req.body;

    if (!partyid || !timeslot) {
      throw new Error("Please provide all required fields");
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
      throw new Error("Failed to schedule the party");
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
        "Party not found or you don't have permission to delete it"
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
      throw new Error("Failed to delete the party");
    }

    res.sendStatus(200);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
