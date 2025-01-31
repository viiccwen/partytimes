"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

import { PartyHeader } from "./party-header";
import { PartyTimelineHeader } from "./party-timeline-header";
import { GuestDialog } from "../guest-dialog";
import { PartyButton } from "./timeline/party-timeline-button";
import { TimeLineComponent } from "./timeline/timeline-component";

import { block_type, useVoteBlockStore } from "@/stores/inspect-party-store";
import { party_return_schema_type, user_info_schema_type } from "@/lib/type";
import { usePartyStore } from "@/stores/party-store";
import { useTimelineUserStore } from "@/stores/timeline-user-store";

interface PartyTimelineCardProps {
  className?: string;
  HandleCheckButton: () => Promise<void>;
  HandleScheduleButton: () => Promise<void>;
  HandleDeleteButton: () => Promise<void>;
  HandleCancelButton: () => void;
}

export const PartyTimelineCard = ({
  className,
  HandleCheckButton,
  HandleScheduleButton,
  HandleDeleteButton,
  HandleCancelButton,
}: PartyTimelineCardProps) => {
  const { user } = useTimelineUserStore();

  return (
    <>
      <Card className={className}>
        <CardContent>
          <PartyHeader className="mt-5" isLogin={user !== undefined} />
          <Separator className="h-1 my-3" />
          <PartyTimelineHeader
            className="mt-5"
            HandleCheckButton={HandleCheckButton}
            HandleScheduleButton={HandleScheduleButton}
            HandleDeleteButton={HandleDeleteButton}
            HandleCancelButton={HandleCancelButton}
          />
          <TimeLineComponent />
        </CardContent>
      </Card>
      
      <GuestDialog />
    </>
  );
};
