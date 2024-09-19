"use client";

import { decision_schema_type, party_return_schema_type, votes_schema_type } from "@/lib/type";
import { PartyTimelineCard } from "./party-timeline-card";
import { PartyJoinCard } from "./party-join-card";
import { useVoteBlockStore } from "@/stores/inspect-party-store";

interface InspectPartyContainerProps {
  party: party_return_schema_type;
  votes: votes_schema_type[];
  total_hours: number;
  nickname: string;
  userid: number;
  scheduled_time: decision_schema_type | null;
  isLogin: boolean;
}

export const InspectPartyContainer = ({
  party,
  votes,
  total_hours,
  nickname,
  userid,
  scheduled_time,
  isLogin
}: InspectPartyContainerProps) => {
  const { getTimeSlotBlocks, getUserVoteblocks, getJoinList } = useVoteBlockStore();
  const vote_blocks = getTimeSlotBlocks(votes, total_hours, party);
  const user_votes = getUserVoteblocks(vote_blocks, nickname);
  const join_list = getJoinList(votes);
  const has_scheduled = party.status;

  return (
    <>
      <PartyTimelineCard
        className="col-span-4 flex-1"
        party={party}
        allvoteblocks={vote_blocks}
        user_votes={user_votes}
        VoteNumber={join_list.length}
        userid={userid}
        has_scheduled={has_scheduled}
        scheduled_time={scheduled_time}
        isLogin={isLogin}
      />
      <PartyJoinCard className="col-span-2 flex-initial w-full md:w-1/3" allvoteblocks={vote_blocks} joinList={join_list} />
    </>
  );
};
