"use server";

import { party_return_schema_type, votes_schema_type } from "@/lib/type";
import { PartyJoinCard } from "./party-join-card";
import { PartyTimelineCard } from "./party-timeline-card";
import { CreateVote, GetVoteTimes } from "@/actions/vote-actions";
import { ampm } from "@/lib/schema";
import { redirect } from "next/navigation";

interface InspectPartyPanelProps {
  party: party_return_schema_type;
}

type block_type = {
  creatorName: string;
};

export const InspectPartyPanel = async ({ party }: InspectPartyPanelProps) => {
  const votes = await GetVoteTimes(party.partyid);
  const total_hours = CalculateTotalHours(party);
  let voteBlocks: Array<block_type[]>[] = CreateTimeSlotBlocks(
    votes.data,
    total_hours,
    party
  );

  return (
    <>
      <div className="w-full">
        <div className="grid grid-cols-6 gap-6">
          <PartyTimelineCard
            className="col-span-4"
            party={party}
            votes={voteBlocks}
          />
          <PartyJoinCard className="col-span-2" joinList={null} />
        </div>
      </div>
    </>
  );
};

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
      // console.log(start, end);
      // push start to end blocks
      for (let i = start; i < end; i += 0.5) {
        const col = i * 2;
        blocks[row][col].push({ creatorName: vote.creatorName });
      }
    });
  });

  return blocks;
};
