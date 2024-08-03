import { prisma } from "..";
import { GeneratePartyId } from "../utils/utils";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * @param date: string[]
 * @param description: string
 * @param title: string
 * @param start_time: string
 * @param start_ampm: string
 * @param end_time: string
 * @param end_ampm: string
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

    if (!partyid)
      throw new Error("Please provide correct party information");

    const party = await prisma.party.findFirst({
      where: { partyid },
    });

    if (!party) throw new Error("Party is not found");

    res.status(200).json(party);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
