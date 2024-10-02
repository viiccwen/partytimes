"use client";

import { decision_schema_type, party_return_schema_type, user_info_schema_type, votes_schema_type } from "@/lib/type";
import { PartyTimelineCard } from "./party-timeline-card";
import { PartyJoinCard } from "./party-join-card";
import { useVoteBlockStore } from "@/stores/inspect-party-store";
import { CalculateTotalHours } from "./timeline/party-timeline-helper";

interface InspectPartyContainerProps {
  party: party_return_schema_type;
  votes: votes_schema_type[];
  user: user_info_schema_type | undefined;
}

export const InspectPartyContainer = ({
  party,
  user,
  votes,
}: InspectPartyContainerProps) => {
  const { getTimeSlotBlocks, getUserVoteblocks, getJoinList } = useVoteBlockStore();
  const vote_blocks = getTimeSlotBlocks(votes, CalculateTotalHours(party), party);
  const user_votes = getUserVoteblocks(vote_blocks, user?.nickname);
  const join_list = getJoinList(votes);

  return (
    <>
      <PartyTimelineCard
        className="col-span-4 flex-1"
        party={party}
        user={user}
        allvoteblocks={vote_blocks}
        user_votes={user_votes}
        VoteNumber={join_list.length}
      />
      <PartyJoinCard className="col-span-2 flex-initial w-full md:w-1/3" allvoteblocks={vote_blocks} joinList={join_list} />
    </>
  );
};
