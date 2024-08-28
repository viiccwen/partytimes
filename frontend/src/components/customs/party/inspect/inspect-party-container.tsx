"use client";

import { party_return_schema_type, votes_schema_type } from "@/lib/type";
import { PartyTimelineCard } from "./party-timeline-card";
import { PartyJoinCard } from "./party-join-card";
import { useVoteBlockStore } from "@/stores/inspect-party-store";

interface InspectPartyContainerProps {
  party: party_return_schema_type;
  votes: votes_schema_type[];
  total_hours: number;
  nickname: string;
  userid: number;
}

export const InspectPartyContainer = ({
  party,
  votes,
  total_hours,
  nickname,
  userid,
}: InspectPartyContainerProps) => {
  const { getTimeSlotBlocks, getUserVoteblocks, getJoinList } = useVoteBlockStore();
  const vote_blocks = getTimeSlotBlocks(votes, total_hours, party);
  const user_votes = getUserVoteblocks(vote_blocks, nickname);
  const join_list = getJoinList(votes);

  // bug with update allvoteblocks

  return (
    <>
      <PartyTimelineCard
        className="col-span-4"
        party={party}
        allvoteblocks={vote_blocks}
        user_votes={user_votes}
        VoteNumber={join_list.length}
        nickname={nickname}
        userid={userid}
      />
      <PartyJoinCard className="col-span-2" allvoteblocks={vote_blocks} joinList={join_list} />
    </>
  );
};
