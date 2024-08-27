"use client";

import { party_return_schema_type, votes_schema_type } from "@/lib/type";
import { PartyTimelineCard } from "./party-timeline-card";
import { PartyJoinCard } from "./party-join-card";
import { create } from "zustand";

interface InspectPartyContainerProps {
  party: party_return_schema_type;
  votes: votes_schema_type[];
  total_hours: number;
  nickname: string;
}

type block_type = {
  creatorName: string;
};

type position_type = {
  row: number;
  col: number;
};

type party_inspect_type = {
  cur_points_position: position_type;
  updateCurPointsPosition: (row: number, col: number) => void;
  getTimeSlotBlocks: (
    votes: votes_schema_type[],
    total_hours: number,
    party: party_return_schema_type
  ) => block_type[][][];
  getUserVoteblocks: (vote_blocks: block_type[][][], nickname: string) => Set<string>;
  getJoinList: (votes: votes_schema_type[]) => Set<string>;
};

export const useVoteBlockStore = create<party_inspect_type>((state) => ({
  cur_points_position: { row: -1, col: -1 },
  updateCurPointsPosition: (row, col) =>
    state({ cur_points_position: { row, col } }),
  getTimeSlotBlocks(votes, total_hours, party) {
    let blocks: Array<block_type[]>[] = Array.from(
      { length: party.date.length },
      () => Array.from({ length: total_hours * 2 }, () => [])
    );

    votes.forEach((vote: votes_schema_type) => {
      vote.timeslots.forEach((timeslot) => {
        const date = timeslot.date;
        const row = party.date.findIndex((v) => v === date);

        const start_time = timeslot.start_time;
        const end_time = timeslot.end_time;
        const start_ampm = timeslot.start_ampm;
        const end_ampm = timeslot.end_ampm;

        const start =
          (start_time === 12 ? 0 : start_time) +
          (start_ampm === "PM" ? 12 : 0) -
          party.start_time;
        const end =
          (end_time === 12 ? 0 : end_time) +
          (end_ampm === "PM" ? 12 : 0) -
          party.start_time;

        // push start to end blocks
        for (let i = start; i < end; i += 0.5) {
          const col = i * 2;
          blocks[row][col].push({ creatorName: vote.creatorName });
        }
      });
    });

    return blocks;
  },
  getUserVoteblocks(vote_blocks, nickname) {
    if (!nickname) return new Set<string>();
    let userVoteBlocks: Set<string> = new Set();

    vote_blocks.forEach((blocks, row) => {
      blocks.forEach((block, col) => {
        block.forEach((vote) => {
          if (vote.creatorName === nickname) {
            userVoteBlocks.add(`${row}-${col}`);
          }
        });
      });
    });

    return userVoteBlocks;
  },
  getJoinList(votes: votes_schema_type[]) {
    return new Set(votes.map((vote) => vote.creatorName));
  },
}));

export const InspectPartyContainer = ({
  party,
  votes,
  total_hours,
  nickname,
}: InspectPartyContainerProps) => {
  const vote_blocks = useVoteBlockStore((store) =>
    store.getTimeSlotBlocks(votes, total_hours, party)
  );
  const user_votes = useVoteBlockStore((store) =>
    store.getUserVoteblocks(vote_blocks, nickname)
  );
  const join_list = useVoteBlockStore((store) => store.getJoinList(votes));

  return (
    <>
      <PartyTimelineCard
        className="col-span-4"
        party={party}
        AllvoteBlocks={vote_blocks}
        userVoteBlocks={user_votes}
        VoteNumber={join_list.size}
      />
      <PartyJoinCard className="col-span-2" Allvotes={vote_blocks} joinList={join_list} />
    </>
  );
};
