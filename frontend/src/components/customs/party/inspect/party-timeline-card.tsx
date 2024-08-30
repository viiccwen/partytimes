"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

import { PartyHeader } from "./party-header";
import { PartyTimelineHeader } from "./party-timeline-header";
import { GuestDialog } from "../guest-dialog";

import { decision_schema_type, party_return_schema_type } from "@/lib/type";

import { CheckAuth } from "@/actions/user-actions";
import { useGuestVoteStore } from "@/stores/guest-vote-store";
import { block_type, useVoteBlockStore } from "@/stores/inspect-party-store";
import {
  CalculateTotalHours,
  generateGridCells,
  generateHeader,
  GenerateScheduledBlock,
  GenerateTimeSlots,
} from "@/lib/party-timeline-helper";
import { CreateVote, DeleteVote } from "@/actions/vote-actions";
import { useRouter } from "next/navigation";
import { CreateSchedule, DeleteSchedule } from "@/actions/schedule-action";

interface PartyTimelineCardProps {
  className?: string;
  party: party_return_schema_type;
  allvoteblocks: block_type[][][];
  user_votes: Set<string>;
  VoteNumber: number;
  userid: number;
  has_scheduled: boolean;
  scheduled_time: decision_schema_type | null;
}

const Cookie = require("js-cookie");

export const PartyTimelineCard = ({
  className,
  party,
  allvoteblocks,
  VoteNumber,
  user_votes,
  userid,
  has_scheduled,
  scheduled_time,
}: PartyTimelineCardProps) => {
  const {
    clicked_user,
    cur_points_userid,
    isEditing,
    isScheduling,
    isMouseDown,
    updateClickedUser,
    updateCurPointsPosition,
    updateIsEditing,
    updateIsScheduling,
    updateIsMouseDown,
    updateIsBounced,
    getUserVoteblocks,
  } = useVoteBlockStore();
  const { setOpen, setTimeslots } = useGuestVoteStore();

  const [userSelectBlock, setUserSelectBlock] =
    useState<Set<string>>(user_votes);
  const [hydrated, setHydrated] = useState<boolean>(false);
  const router = useRouter();

  if (!allvoteblocks || allvoteblocks.length === 0) return null;

  const ToggleBlockSelection = (prev: Set<string>, block_key: string) => {
    const newSet = new Set(prev);
    newSet.has(block_key) ? newSet.delete(block_key) : newSet.add(block_key);
    return newSet;
  };

  const ToggleBlockSchedule = (prev: Set<string>, col: number, row: number) => {
    const block_key = `${col}-${row}`;
    const newSet = new Set<string>();

    Array.from(prev).forEach((key) => {
      const [prevCol, prevRow] = key.split("-").map(Number);
      if (prevCol === col) {
        newSet.add(key);
      }
    });

    if (newSet.has(block_key)) {
      newSet.delete(block_key);
    } else {
      newSet.add(block_key);
    }
    return newSet;
  };
  const HandleClickTimeBlock = useCallback(
    (row: number, col: number) => {
      if (!isEditing && !isScheduling) {
        updateIsBounced(true);

        setTimeout(() => {
          updateIsBounced(false);
        }, 150);

        setTimeout(() => {
          updateIsBounced(true);
        }, 300);

        setTimeout(() => {
          updateIsBounced(false);
        }, 450);

        return;
      }

      const block_key = `${col}-${row}`;

      if (isEditing) {
        setUserSelectBlock((prev) => {
          return ToggleBlockSelection(prev, block_key);
        });
      } else if (isScheduling) {
        if (!isMouseDown) {
          setUserSelectBlock(new Set<string>());
        }

        setUserSelectBlock((prev) => {
          return ToggleBlockSchedule(prev, col, row);
        });
      }
    },
    [isEditing, isScheduling, isMouseDown, updateIsBounced]
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
      isScheduling,
      allvoteblocks,
      updateCurPointsPosition,
      updateIsMouseDown,
      cur_points_userid,
      clicked_user
    );
    const scheduledBlock = GenerateScheduledBlock(party, scheduled_time);

    const container = (
      <div>
        {header}
        {scheduledBlock !== null && scheduledBlock}
        {gridCells}
      </div>
    );

    return container;
  }, [
    party,
    HandleClickTimeBlock,
    userSelectBlock,
    cur_points_userid,
    clicked_user,
  ]);

  const HandleCheckButton = async () => {
    if (!isEditing) {
      updateIsEditing(true);

      // let userSelectBlock be the same as clicked user's vote blocks
      if (clicked_user.userId !== "") {
        setUserSelectBlock(
          getUserVoteblocks(allvoteblocks, clicked_user.creatorName)
        );
      }
    } else if (userSelectBlock.size === 0) {
      toast.error("請選擇時間區塊！");
    } else {
      // check token
      const token = Cookie.get("token");
      const isAuth = await CheckAuth(token);
      const timeslots = GenerateTimeSlots(userSelectBlock, party);

      if (!isAuth) {
        if (clicked_user.userId === "") {
          // show guest dialog & create vote by new guest user
          setTimeslots(timeslots);
          setOpen(true);
        } else {
          // create vote by old guest user
          const res = await CreateVote(
            timeslots,
            party.partyid,
            clicked_user.creatorName,
            clicked_user.userId
          );

          if (!res.correct) toast.error(res.error);
          else {
            await RefreshVoteData();
            toast.success("successfully create vote!");
          }
        }
      } else {
        // create vote by login user
        const res = await CreateVote(timeslots, party.partyid);

        if (!res.correct) toast.error(res.error);
        else {
          await RefreshVoteData();
          toast.success("successfully create vote!");
        }
      }
    }
  };

  const HandleCancelButton = useCallback(() => {
    setUserSelectBlock(user_votes);
    updateIsEditing(false);
    updateIsScheduling(false);
  }, [user_votes, updateIsEditing, updateIsScheduling]);

  const HandleScheduleButton = async () => {
    if (has_scheduled) {
      const res = await DeleteSchedule(party.partyid);
      if (!res.correct) toast.error(res.error);
      else {
        await RefreshVoteData();
        toast.success("successfully delete schedule!");
        return;
      }
    }

    if (!isScheduling) {
      setUserSelectBlock(new Set<string>());
      updateIsScheduling(true);
    } else if (userSelectBlock.size === 0) {
      toast.error("請選擇時間區塊！");
    } else {
      const timeslot = GenerateTimeSlots(userSelectBlock, party)[0];

      const res = await CreateSchedule(party.partyid, timeslot);
      if (!res.correct) toast.error(res.error);
      else {
        await RefreshVoteData();
        setUserSelectBlock(new Set<string>());
        toast.success("successfully create schedule!");
      }
      updateIsScheduling(false);
    }
  };

  const HandleDeleteButton = useCallback(async () => {
    let delete_userid: number;
    if (clicked_user.userId === "" && userid === -1) {
      toast.error("請先選擇使用者!");
      return;
    } else if (clicked_user.userId === "" && userid !== -1) {
      delete_userid = userid;
    } else {
      delete_userid = Number(clicked_user.userId);
    }
    const res = await DeleteVote(party.partyid, delete_userid);

    if (!res.correct) toast.error(res.error);
    else {
      await RefreshVoteData();
      toast.success("successfully delete vote!");
    }
  }, [party.partyid, clicked_user.userId]);

  const RefreshVoteData = async () => {
    updateCurPointsPosition(-1, -1);
    updateClickedUser("", "");
    updateIsEditing(false);
    router.refresh();
  };

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
            HandleCheckButton={HandleCheckButton}
            HandleScheduleButton={HandleScheduleButton}
            HandleDeleteButton={HandleDeleteButton}
            isEditing={isEditing}
            isScheduling={isScheduling}
            has_scheduled={has_scheduled}
            HandleCancelButton={HandleCancelButton}
          />
          {TimeLineComponent}
        </CardContent>
      </Card>
      <GuestDialog partyid={party.partyid} />
    </>
  );
};
