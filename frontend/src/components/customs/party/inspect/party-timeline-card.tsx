"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

import { PartyHeader } from "./party-header";
import { PartyTimelineHeader } from "./party-timeline-header";
import { GuestDialog } from "../guest-dialog";

import {
  party_return_schema_type,
} from "@/lib/type";

import { CheckAuth } from "@/actions/user-actions";
import { useGuestVoteStore } from "@/stores/guest-vote-store";
import {
  block_type,
  useVoteBlockStore,
} from "@/stores/inspect-party-store";
import { CalculateTotalHours, generateGridCells, generateHeader, GenerateTimeSlots } from "@/lib/party-timeline-helper";

interface PartyTimelineCardProps {
  className?: string;
  party: party_return_schema_type;
  AllvoteBlocks: block_type[][][];
  userVoteBlocks: Set<string>;
  VoteNumber: number;
}

const Cookie = require("js-cookie");

export const PartyTimelineCard = ({
  className,
  party,
  AllvoteBlocks,
  userVoteBlocks,
  VoteNumber,
}: PartyTimelineCardProps) => {
  const [userSelectBlock, setUserSelectBlock] =
    useState<Set<string>>(userVoteBlocks);
  const [hydrated, setHydrated] = useState<boolean>(false);

  const {
    clicked_user,
    cur_points_userid,
    isEditing,
    updateCurPointsPosition,
    updateIsEditing,
    getUserVoteblocks,
  } = useVoteBlockStore();

  const { open, setOpen, setTimeslots } = useGuestVoteStore();

  const ToggleBlockSelection = (prev: Set<string>, block_key: string) => {
    const newSet = new Set(prev);
    newSet.has(block_key) ? newSet.delete(block_key) : newSet.add(block_key);
    return newSet;
  };

  const HandleClickTimeBlock = useCallback(
    (row: number, col: number) => {
      if (!isEditing) {
        toast.error("請先進入編輯模式");
        return;
      }

      const block_key = `${col}-${row}`;
      setUserSelectBlock((prev) => {
        return ToggleBlockSelection(prev, block_key);
      });
    },
    [isEditing]
  );

  const TimeLineComponent = useMemo(() => {
    const total_hours = CalculateTotalHours(party);
    const total_half_hours = total_hours * 2;
    const header = generateHeader(party);
    const gridCells = generateGridCells(
      party,
      total_half_hours,
      VoteNumber,
      HandleClickTimeBlock,
      userSelectBlock,
      isEditing,
      AllvoteBlocks,
      updateCurPointsPosition,
      cur_points_userid,
      clicked_user
    );

    const container = (
      <div>
        {header}
        {gridCells}
      </div>
    );

    return container;
  }, [party, HandleClickTimeBlock, userSelectBlock, cur_points_userid, clicked_user]);

  const HandleCheckButton = async () => {
    if (!isEditing) {
      updateIsEditing(true);

      // let userSelectBlock be the same as clicked user's vote blocks
      if (clicked_user.userId !== "") {
        setUserSelectBlock(
          getUserVoteblocks(AllvoteBlocks, clicked_user.creatorName)
        );
      }

      toast.success("已進入編輯模式");
    } else if (userSelectBlock.size === 0) {
      toast.error("請選擇時間區塊！");
    } else {
      // check token
      const token = Cookie.get("token");
      const isAuth = await CheckAuth(token);
      const timeslots = GenerateTimeSlots(userSelectBlock, party);

      if (!isAuth) {
        setTimeslots(timeslots);
        setOpen(true);
      } else {
        // todo: implement
        // const res = await CreateVote(timeslots, party.partyid);

        // if (!res.correct) toast.error(res.error);
        // else window.location.reload();
      }
    }
  };

  const HandleCancelButton = useCallback(() => {
    setUserSelectBlock(userVoteBlocks);
    updateIsEditing(false);
  }, [userVoteBlocks, updateIsEditing]);

  // todo: implement
  const HandleScheduleButton = useCallback(() => {
    console.log("Schedule Button Click");
    // TODO: Implement schedule logic
  }, []);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <>
      <Card className={className}>
        <CardContent>
          <PartyHeader className="mt-5" party={party} />
          <Separator className="h-1 my-3" />
          <PartyTimelineHeader
            className="mt-5"
            party={party}
            HandleCheckButton={HandleCheckButton}
            HandleScheduleButton={HandleScheduleButton}
            isEditing={isEditing}
            HandleCancelButton={HandleCancelButton}
          />
          {TimeLineComponent}
        </CardContent>
      </Card>
      <GuestDialog partyid={party.partyid} />
    </>
  );
};

