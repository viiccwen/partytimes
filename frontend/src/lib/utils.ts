import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { party_return_schema_type, votes_schema_type } from "./type";
import { block_type } from "@/stores/inspect-party-store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Delay = async (delay_sec: number, correct: true) => {
  if (correct) {
    return new Promise((resolve) => setTimeout(resolve, delay_sec * 1000));
  } else {
    return new Promise((reject) => setTimeout(reject, delay_sec * 1000));
  }
};

// Get Joiner List
export const getJoinList = (votes: votes_schema_type[]) => {
  return votes.map((vote) => ({
    creatorName: vote.creatorName,
    userId: vote.userId,
  }));
};

// Get Time Slot Blocks
export const getUserVoteblocks = (
  vote_blocks: block_type[][][],
  nickname: string | undefined,
): Set<string> => {
  if (!nickname) return new Set<string>();

  return new Set(
    vote_blocks.flatMap((blocks, row) =>
      blocks.flatMap((block, col) =>
        block
          .filter((vote) => vote.creatorName === nickname)
          .map(() => `${row}-${col}`),
      ),
    ),
  );
};

// Get time slot blocks for each vote
export const getTimeSlotBlocks = (
  votes: votes_schema_type[],
  total_hours: number,
  party: party_return_schema_type,
) => {
  let blocks: block_type[][][] = Array.from({ length: party.date.length }, () =>
    Array.from({ length: total_hours * 2 }, () => []),
  );

  const party_start_time = ConvertTo24Hours(
    party.start_time,
    party.start_ampm,
    true,
  );

  votes.forEach((vote: votes_schema_type) => {
    vote.timeslots.forEach((timeslot) => {
      const date = timeslot.date;
      const row = party.date.findIndex((v) => v === date);

      const start_time = ConvertTo24Hours(
        timeslot.start_time,
        timeslot.start_ampm,
        true,
      );
      const end_time = ConvertTo24Hours(
        timeslot.end_time,
        timeslot.end_ampm,
        false,
      );

      const start = start_time - party_start_time;
      const end = end_time - party_start_time;

      for (let i = start; i < end; i += 0.5) {
        const col = i * 2;
        blocks[row][col].push({
          creatorName: vote.creatorName,
          userId: vote.userId,
          isScheduled: false,
        });
      }
    });
  });

  return blocks;
};

export const ConvertTo24Hours = (
  time: number,
  ampm: string,
  isStart: boolean,
) => {
  let return_time: number = time === 12 ? 0 : time;

  if (return_time === 0 && ampm == "AM" && isStart) return_time = 0;
  else if (return_time === 0 && ampm == "AM" && !isStart) return_time = 24;
  else return_time = ampm === "PM" ? return_time + 12 : return_time;

  return return_time;
};

export const CalculateTotalHours = (
  party: party_return_schema_type,
): number => {
  let start_time: number = ConvertTo24Hours(
    party.start_time,
    party.start_ampm,
    true,
  );
  let end_time: number = ConvertTo24Hours(
    party.end_time,
    party.end_ampm,
    false,
  );
  return end_time - start_time;
};
