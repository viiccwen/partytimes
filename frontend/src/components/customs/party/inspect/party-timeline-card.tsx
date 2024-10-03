"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

import { PartyHeader } from "./party-header";
import { PartyTimelineHeader } from "./party-timeline-header";
import { GuestDialog } from "../guest-dialog";
import { PartyTimelineLogic } from "./timeline/party-timeline-logic";
import { TimeLineComponent } from "./timeline/timeline-component";

import { block_type } from "@/stores/inspect-party-store";
import { party_return_schema_type, user_info_schema_type } from "@/lib/type";

interface PartyTimelineCardProps {
  className?: string;
  party: party_return_schema_type;
  user: user_info_schema_type | undefined;
  allvoteblocks: block_type[][][];
  user_votes: Set<string>;
  VoteNumber: number;
}

export const PartyTimelineCard = ({
  className,
  party,
  user,
  allvoteblocks,
  VoteNumber,
  user_votes,
}: PartyTimelineCardProps) => {
  const [userSelectBlock, setUserSelectBlock] =
    useState<Set<string>>(user_votes);

  const {
    HandleCheckButton,
    HandleScheduleButton,
    HandleDeleteButton,
    HandleCancelButton,
    isEditing,
    isScheduling,
  } = PartyTimelineLogic({
    party,
    allvoteblocks,
    user_votes,
    userid: user?.id,
    userSelectBlock,
    setUserSelectBlock,
  });

  if (!allvoteblocks || allvoteblocks.length === 0) return null;

  return (
    <>
      <Card className={className}>
        <CardContent>
          <PartyHeader className="mt-5" party={party} isLogin={user !== undefined} />
          <Separator className="h-1 my-3" />
          <PartyTimelineHeader
            className="mt-5"
            HandleCheckButton={HandleCheckButton}
            HandleScheduleButton={HandleScheduleButton}
            HandleDeleteButton={HandleDeleteButton}
            HandleCancelButton={HandleCancelButton}
            isEditing={isEditing}
            isScheduling={isScheduling}
            has_scheduled={party.status}
          />
          <TimeLineComponent
            party={party}
            allvoteblocks={allvoteblocks}
            VoteNumber={VoteNumber}
            userSelectBlock={userSelectBlock}
            setUserSelectBlock={setUserSelectBlock}
            isEditing={isEditing}
            isScheduling={isScheduling}
          />
        </CardContent>
      </Card>
      <GuestDialog partyid={party.partyid} />
    </>
  );
};
