import { prisma } from "../db";
import type { TimeSlotType } from "./timeslots.type";
import type { VoteType } from "./vote.type";

export const findVote = async (partyid: string, userid: string) => {
  return await prisma.votetime.findFirst({
    where: { partyid, userId: userid },
  });
};

export const findManyVote = async (partyid: string) => {
  return await prisma.votetime.findMany({
    where: { partyid },
    include: {
      timeslots: true,
    },
  });
};

export const updateVote = async (
  id: number,
  voteData: VoteType,
  timeslots: TimeSlotType[]
) => {
  return await prisma.votetime.update({
    where: { id },
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
};

export const createVote = async (
  voteData: VoteType,
  timeslots: TimeSlotType[]
) => {
  return await prisma.votetime.create({
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
};

export const deleteVote = async (id: number) => {
  return await prisma.votetime.delete({
    where: { id },
  });
};
