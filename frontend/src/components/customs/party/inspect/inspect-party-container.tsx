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
}

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
        VoteNumber={join_list.length}
      />
      <PartyJoinCard className="col-span-2" Allvotes={vote_blocks} joinList={join_list} />
    </>
  );
};
