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
    if (!req.user) throw new Error("尚未登入或是登入狀況有錯誤！");
    if (
      !req.body.date &&
      !req.body.title &&
      !req.body.start_time &&
      !req.body.start_ampm &&
      !req.body.end_time &&
      !req.body.end_ampm
    )
      throw new Error("請提供正確的派對資訊！");

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

    if (!party) throw new Error("創建派對失敗！");

    res.status(200).json({ partyid: partyid });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const GetParty = async (req: any, res: any) => {
  try {
    const { partyid } = await req.query;

    if (!partyid) throw new Error("請提供正確的派對資訊！");

    const party = await prisma.party.findFirst({
      where: { partyid },
      include: { decision: true },
    });

    if (!party) throw new Error("找不到派對資訊！");

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
      decision: party.decision,
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
      include: { decision: true },
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
        decision: party.decision,
      };
    });

    res.status(200).json({ party: filteredParty });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const DeleteParty = async (req: any, res: any) => {
  try {
    if (!req.user) throw new Error("尚未登入或是登入狀況有錯誤！");
    const { partyid } = await req.body;
    const userId = req.user.id;

    if (!partyid) throw new Error("請提供正確的派對資訊！");

    // check is party owner
    const party = await prisma.party.findFirst({
      where: { partyid, userId },
    });

    if (!party) throw new Error("你沒有權限刪除派對！");

    await prisma.$transaction(async (prisma) => {
      await prisma.party.delete({ where: { partyid } });
      await prisma.votetime.deleteMany({ where: { partyid } });
      await prisma.decision.deleteMany({ where: { partyid } });
    });

    res.sendStatus(200);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const UpdateParty = async (req: any, res: any) => {
  try {
    if (!req.user) throw new Error("尚未登入或是登入狀況有錯誤！");
    const userId = req.user.id;
    const { partyid, title, description } = await req.body;
    
    if (!partyid || !title)
      throw new Error("請提供正確的派對資訊！");
    
    // check is party owner
    let party = await prisma.party.findFirst({
      where: { partyid, userId },
    });

    if (!party) throw new Error("你沒有權限刪除派對！");

    party = await prisma.party.update({
      where: { partyid },
      data: {
        title,
        description,
      },
    });

    if (!party) throw new Error("更新派對失敗！");

    res.sendStatus(200);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};