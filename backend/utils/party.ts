import { prisma } from "../db";
import type { PartyType } from "./party.type";

export const findParty = async (partyid: string) => {
  return await prisma.party.findUnique({
    where: { partyid },
    include: { decision: true },
  });
};

export const createParty = async (party: PartyType) => {
  return await prisma.party.create({
    data: party,
  });
};
