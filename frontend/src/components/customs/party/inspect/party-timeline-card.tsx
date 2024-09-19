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
import { decision_schema_type, party_return_schema_type } from "@/lib/type";

interface PartyTimelineCardProps {
  className?: string;
  party: party_return_schema_type;
  allvoteblocks: block_type[][][];
  user_votes: Set<string>;
  VoteNumber: number;
  userid: string;
  has_scheduled: boolean;
  scheduled_time: decision_schema_type | null;
  isLogin: boolean;
}

export const PartyTimelineCard = ({
  className,
  party,
  allvoteblocks,
  VoteNumber,
  user_votes,
  userid,
  has_scheduled,
  scheduled_time,
  isLogin
}: PartyTimelineCardProps) => {
  const [userSelectBlock, setUserSelectBlock] =
    useState<Set<string>>(user_votes);
  const [isConfirmClicked, setIsConfirmClicked] = useState<boolean>(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState<boolean>(false);
  const [isScheduledClicked, setIsScheduledClicked] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState<boolean>(false);

  const {
    HandleCheckButton,
    HandleScheduleButton,
    HandleDeleteButton,
    HandleCancelButton,
    isEditing,
    isScheduling,
  } = PartyTimelineLogic({
    setUserSelectBlock,
    party,
    userSelectBlock,
    user_votes,
    has_scheduled,
    allvoteblocks,
    setIsConfirmClicked,
    setIsDeleteClicked,
    setIsScheduledClicked,
    userid,
  });

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated || !allvoteblocks || allvoteblocks.length === 0) return null;

  return (
    <>
      <Card className={className}>
        <CardContent>
          <PartyHeader className="mt-5" party={party} isLogin={isLogin} />
          <Separator className="h-1 my-3" />
          <PartyTimelineHeader
            className="mt-5"
            HandleCheckButton={HandleCheckButton}
            HandleScheduleButton={HandleScheduleButton}
            HandleDeleteButton={HandleDeleteButton}
            isEditing={isEditing}
            isScheduling={isScheduling}
            isConfirmClicked={isConfirmClicked}
            isDeleteClicked={isDeleteClicked}
            isScheduledClicked={isScheduledClicked}
            has_scheduled={has_scheduled}
            HandleCancelButton={HandleCancelButton}
          />
          <TimeLineComponent
            party={party}
            allvoteblocks={allvoteblocks}
            VoteNumber={VoteNumber}
            userSelectBlock={userSelectBlock}
            setUserSelectBlock={setUserSelectBlock}
            isEditing={isEditing}
            isScheduling={isScheduling}
            scheduled_time={scheduled_time}
          />
        </CardContent>
      </Card>
      <GuestDialog partyid={party.partyid} />
    </>
  );
};
