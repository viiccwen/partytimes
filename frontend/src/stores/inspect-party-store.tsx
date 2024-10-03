import { ConvertTo24Hours } from "@/components/customs/party/inspect/timeline/party-timeline-helper";
import { party_return_schema_type, votes_schema_type } from "@/lib/type";
import { create } from "zustand";

export type block_type = {
  creatorName: string;
  userId: string;
  isScheduled: boolean;
};

export type joinlist_type = {
  creatorName: string;
  userId: string;
};

export type position_type = {
  row: number;
  col: number;
};

export type clicked_user_type = {
  userId: string;
  creatorName: string;
};

type party_inspect_type = {
  cur_points_position: position_type;
  cur_points_userid: string;
  clicked_user: clicked_user_type;
  isEditing: boolean;
  isScheduling: boolean;
  isMouseDown: boolean;
  isBounced: boolean;
  isConfirmClicked: boolean;
  isDeleteClicked: boolean;
  isScheduledClicked: boolean;

  updateCurPointsPosition: (row: number, col: number) => void;
  updateCurPointsUserid: (userid: string) => void;
  updateClickedUser: (userId: string, creatorName: string) => void;
  updateIsEditing: (isEditing: boolean) => void;
  updateIsScheduling: (isScheduling: boolean) => void;
  updateIsMouseDown: (isMouseDown: boolean) => void;
  updateIsBounced: (isBounced: boolean) => void;
  updateIsConfirmClicked: (isConfirmClicked: boolean) => void;
  updateIsDeleteClicked: (isDeleteClicked: boolean) => void;
  updateIsScheduledClicked: (isScheduledClicked: boolean) => void;

  getTimeSlotBlocks: (
    votes: votes_schema_type[],
    total_hours: number,
    party: party_return_schema_type
  ) => block_type[][][];
  getUserVoteblocks: (
    vote_blocks: block_type[][][],
    nickname: string | undefined
  ) => Set<string>;
  getJoinList: (votes: votes_schema_type[]) => Array<joinlist_type>;
};

export const useVoteBlockStore = create<party_inspect_type>((set) => ({
  cur_points_position: { row: -1, col: -1 },
  cur_points_userid: "",
  clicked_user: { userId: "", creatorName: "" },
  isEditing: false,
  isScheduling: false,
  isMouseDown: false,
  isBounced: false,
  isConfirmClicked: false,
  isDeleteClicked: false,
  isScheduledClicked: false,

  updateCurPointsPosition: (row, col) =>
    set({ cur_points_position: { row, col } }),
  updateCurPointsUserid: (userid) => set({ cur_points_userid: userid }),
  updateClickedUser: (userId, creatorName) =>
    set({ clicked_user: { userId, creatorName } }),
  updateIsEditing: (isEditing) => set({ isEditing }),
  updateIsScheduling: (isScheduling) => set({ isScheduling }),
  updateIsMouseDown: (isMouseDown) => set({ isMouseDown }),
  updateIsBounced: (isBounced) => set({ isBounced }),
  updateIsConfirmClicked: (isConfirmClicked) => set({ isConfirmClicked }),
  updateIsDeleteClicked: (isDeleteClicked) => set({ isDeleteClicked }),
  updateIsScheduledClicked: (isScheduledClicked) => set({ isScheduledClicked }),

  getTimeSlotBlocks(votes, total_hours, party) {
    let blocks: block_type[][][] = Array.from(
      { length: party.date.length },
      () => Array.from({ length: total_hours * 2 }, () => [])
    );

    const party_start_time = ConvertTo24Hours(
      party.start_time,
      party.start_ampm,
      true
    );

    votes.forEach((vote: votes_schema_type) => {
      vote.timeslots.forEach((timeslot) => {
        const date = timeslot.date;
        const row = party.date.findIndex((v) => v === date);

        const start_time = ConvertTo24Hours(
          timeslot.start_time,
          timeslot.start_ampm,
          true
        );
        const end_time = ConvertTo24Hours(
          timeslot.end_time,
          timeslot.end_ampm,
          false
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
  },
  getUserVoteblocks(vote_blocks, nickname) {
    if (nickname == undefined) return new Set<string>();
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
    return votes.map((vote) => ({
      creatorName: vote.creatorName,
      userId: vote.userId,
    }));
  },
}));
