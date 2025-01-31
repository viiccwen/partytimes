"use client";
import { useEffect } from "react";
import { PartyJoinCard } from "./party-join-card";
import { PartyTimelineCard } from "./party-timeline-card";
import { PartyButton } from "./timeline/party-timeline-button";

import { party_return_schema_type, user_info_schema_type } from "@/lib/type";
import {
  block_type,
  joinlist_type,
  useVoteBlockStore,
} from "@/stores/inspect-party-store";
import { usePartyStore } from "@/stores/party-store";
import { useTimelineUserStore } from "@/stores/timeline-user-store";

interface PartyContentProps {
  initial_party: party_return_schema_type;
  user: user_info_schema_type | undefined;
  initial_vote_blocks: block_type[][][];
  user_votes: Set<string>;
  initial_join_lists: joinlist_type[];
}

export const PartyContent = ({
  initial_party,
  user,
  initial_vote_blocks,
  user_votes,
  initial_join_lists,
}: PartyContentProps) => {
  const { updateSelectedBlock, updateVoteBlocks } = useVoteBlockStore();
  const { join_lists, setJoinLists } = useTimelineUserStore();
  const { setParty } = usePartyStore();

  const {
    HandleCheckButton,
    HandleScheduleButton,
    HandleDeleteButton,
    HandleCancelButton,
  } = PartyButton({
    user_votes,
    userid: user?.id,
  });

  useEffect(() => {
    updateSelectedBlock(user_votes);
  }, [user_votes]);

  useEffect(() => {
    setParty(initial_party);
  }, [initial_party]);

  useEffect(() => {
    updateVoteBlocks(initial_vote_blocks);
  }, [initial_vote_blocks]);

  useEffect(() => {
    setJoinLists(initial_join_lists);
  }, [join_lists]);

  return (
    <>
      <PartyTimelineCard
        className="col-span-4 flex-1"
        user={user}
        HandleCheckButton={HandleCheckButton}
        HandleScheduleButton={HandleScheduleButton}
        HandleDeleteButton={HandleDeleteButton}
        HandleCancelButton={HandleCancelButton}
      />
      <PartyJoinCard className="col-span-2 flex-initial w-full md:w-1/3" />
    </>
  );
};
