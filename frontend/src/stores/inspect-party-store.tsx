import { party_return_schema_type, votes_schema_type } from "@/lib/type";
import { create } from "zustand";

type block_type = {
  creatorName: string;
  userId: string;
};

type joinlist_type = {
  creatorName: string;
  userId: string;
}

type position_type = {
  row: number;
  col: number;
};

type party_inspect_type = {
  cur_points_position: position_type;
  cur_points_userid: string;
  clicked_user: string;

  updateCurPointsPosition: (row: number, col: number) => void;
  updateCurPointsUserid: (userid: string) => void;
  updateClickedUser: (clicked_user: string) => void;

  getTimeSlotBlocks: (
    votes: votes_schema_type[],
    total_hours: number,
    party: party_return_schema_type
  ) => block_type[][][];
  getUserVoteblocks: (vote_blocks: block_type[][][], nickname: string) => Set<string>;
  getJoinList: (votes: votes_schema_type[]) => Array<joinlist_type>;
};

export const useVoteBlockStore = create<party_inspect_type>((state) => ({
  cur_points_position: { row: -1, col: -1 },
  cur_points_userid: "",
  clicked_user: "",

  updateCurPointsPosition: (row, col) =>
    state({ cur_points_position: { row, col } }),
  updateCurPointsUserid: (userid) => state({ cur_points_userid: userid }),
  updateClickedUser: (clicked_user) => state({ clicked_user }),

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
          blocks[row][col].push({ creatorName: vote.creatorName, userId: vote.userId });
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
    return votes.map((vote) => ({ creatorName: vote.creatorName, userId: vote.userId }));
  },
}));