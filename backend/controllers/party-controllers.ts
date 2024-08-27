import { prisma } from "..";
import { GeneratePartyId } from "../utils/utils";

/**
 * @param date: string[]
 * @param description: string
 * @param title: string
 * @param start_time: number
 * @param start_ampm: string
 * @param end_time: number
 * @param end_ampm: string
 * @param status: boolean
 */

export const CheckExistParty = async (partyid: string) => {
  const party = await prisma.party.findUnique({ where: { partyid } });
  return party ? true : false;
};

export const CreateParty = async (req: any, res: any) => {
  try {
    if (!req.user) throw new Error("You are not logged in");
    if (
      !req.body.date &&
      !req.body.title &&
      !req.body.start_time &&
      !req.body.start_ampm &&
      !req.body.end_time &&
      !req.body.end_ampm
    )
      throw new Error("Please provide correct party information");

    let partyid;
    let isExist = true;
    while (isExist) {
      partyid = GeneratePartyId();
      isExist = await CheckExistParty(partyid);
    }

    const party = await prisma.party.create({
      data: {
        partyid: partyid,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        start_time: req.body.start_time,
        start_ampm: req.body.start_ampm,
        end_time: req.body.end_time,
        end_ampm: req.body.end_ampm,
        userId: req.user.id,
      },
    });

    if (!party) throw new Error("Failed to create party");

    res.status(200).json({ partyid: partyid });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const GetParty = async (req: any, res: any) => {
  try {
    const { partyid } = await req.query;

    if (!partyid) throw new Error("Please provide correct party information");

    const party = await prisma.party.findFirst({
      where: { partyid },
    });

    if (!party) throw new Error("Party is not found");

    const filteredParty = {
      title: party.title,
      partyid: party.partyid,
      description: party.description,
      status: party.status,
      date: party.date,
      start_time: party.start_time,
      start_ampm: party.start_ampm,
      end_time: party.end_time,
      end_ampm: party.end_ampm,
    };

    res.status(200).json({ party: filteredParty });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const GetPartyList = async (req: any, res: any) => {
  try {
    const party = await prisma.party.findMany({
      where: { userId: req.user.id },
    });

    const filteredParty = party?.map((party) => {
      return {
        title: party.title,
        partyid: party.partyid,
        description: party.description,
        status: party.status,
        date: party.date,
        start_time: party.start_time,
        start_ampm: party.start_ampm,
        end_time: party.end_time,
        end_ampm: party.end_ampm,
      };
    });

    res.status(200).json({ party: filteredParty });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const DeleteParty = async (req: any, res: any) => {
  try {
    const { partyid } = await req.body;
    const userId = req.user.id;

    if (!partyid) throw new Error("Please provide correct party information");

    await prisma.$transaction(async (prisma) => {
      await prisma.votetime.deleteMany({
        where: { partyid },
      });

      const party = await prisma.party.delete({
        where: { partyid, userId },
      });

      if (!party) throw new Error("Failed to delete party");
    });

    res.sendStatus(200);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const UpdateParty = async (req: any, res: any) => {
  try {
    const { partyid, title, description } = await req.body;

    if (!partyid || !title)
      throw new Error("Please provide correct party information");

    const party = await prisma.party.update({
      where: { partyid },
      data: {
        title,
        description,
      },
    });

    if (!party) throw new Error("Failed to update party");

    res.sendStatus(200);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
