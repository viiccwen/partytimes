import { create } from "zustand";

import { party_return_schema_type, votes_schema_type } from "@/lib/type";

import { GetVoteTimes } from "@/actions/vote-actions";
import { GetUserInfo } from "@/actions/user-actions";
import { ampm } from "@/lib/schema";

type block_type = {
  creatorName: string;
};

interface InspectPartyPanelState {
  party: party_return_schema_type | null;
  votes: votes_schema_type[];
  userinfo: any;
  voteBlocks: Array<block_type[]>[];
  userVoteBlocks: Set<string>;
  joinList: Set<string>;
  token: string | undefined;
  loadPartyData: (party: party_return_schema_type, token: string) => Promise<void>;
}

export const useInspectPartyPanelStore = create<InspectPartyPanelState>((set) => ({
  party: null,
  votes: [],
  userinfo: null,
  voteBlocks: [],
  userVoteBlocks: new Set<string>(),
  joinList: new Set<string>(),
  token: undefined,
  loadPartyData: async (party, token) => {
    const votes = await GetVoteTimes(party.partyid);
    const userinfo = await GetUserInfo(token);

    const total_hours = CalculateTotalHours(party);
    const voteBlocks = CreateTimeSlotBlocks(votes.data, total_hours, party);
    const userVoteBlocks = CreateUserVoteBlocks(userinfo.data?.nickname, voteBlocks);
    const joinList = GetJoinList(votes.data);

    set({
      party,
      votes: votes.data,
      userinfo: userinfo.data,
      voteBlocks,
      userVoteBlocks,
      joinList,
      token,
    });
  },
}));

const CalculateTotalHours = (party: party_return_schema_type): number => {
  let start_time = party.start_time === 12 ? 0 : party.start_time;
  start_time =
    party.start_ampm === ampm[0] ? party.start_time : party.start_time + 12;

  let end_time = party.end_time === 12 ? 0 : party.end_time;
  end_time = party.end_ampm === ampm[0] ? party.end_time : party.end_time + 12;

  return end_time - start_time;
};

const CreateTimeSlotBlocks = (
  votes: votes_schema_type[],
  total_hours: number,
  party: party_return_schema_type
) => {
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
        (start_time === 12 ? 0 : start_time) + (start_ampm === "PM" ? 12 : 0) - party.start_time;
      const end = (end_time === 12 ? 0 : end_time) + (end_ampm === "PM" ? 12 : 0) - party.start_time;

      // push start to end blocks
      for (let i = start; i < end; i += 0.5) {
        const col = i * 2;
        blocks[row][col].push({ creatorName: vote.creatorName });
      }
    });
  });

  return blocks;
};

const CreateUserVoteBlocks = (nickname: string | undefined, voteBlocks: Array<block_type[]>[]) => {
  if (!nickname) return new Set<string>();
  let userVoteBlocks: Set<string> = new Set();

  voteBlocks.forEach((blocks, row) => {
    blocks.forEach((block, col) => {
      block.forEach((vote) => {
        if (vote.creatorName === nickname) {
          userVoteBlocks.add(`${row}-${col}`);
        }
      });
    });
  });

  return userVoteBlocks;
}

const GetJoinList = (votes: votes_schema_type[]) => {
  return new Set(votes.map((vote) => vote.creatorName));
}
