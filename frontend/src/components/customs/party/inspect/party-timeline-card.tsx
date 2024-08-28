"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

import { PartyHeader } from "./party-header";
import { PartyTimelineHeader } from "./party-timeline-header";
import { GuestDialog } from "../guest-dialog";

import { party_return_schema_type } from "@/lib/type";

import { CheckAuth } from "@/actions/user-actions";
import { useGuestVoteStore } from "@/stores/guest-vote-store";
import { block_type, useVoteBlockStore } from "@/stores/inspect-party-store";
import {
  CalculateTotalHours,
  generateGridCells,
  generateHeader,
  GenerateTimeSlots,
} from "@/lib/party-timeline-helper";
import { CreateVote, DeleteVote, GetVoteTimes } from "@/actions/vote-actions";
import { useRouter } from "next/navigation";

interface PartyTimelineCardProps {
  className?: string;
  party: party_return_schema_type;
  allvoteblocks: block_type[][][];
  user_votes: Set<string>;
  VoteNumber: number;
  nickname: string;
  userid: number;
}

const Cookie = require("js-cookie");

export const PartyTimelineCard = ({
  className,
  party,
  allvoteblocks,
  VoteNumber,
  user_votes,
  nickname,
  userid,
}: PartyTimelineCardProps) => {
  const {
    clicked_user,
    cur_points_userid,
    isEditing,
    updateAllvoteblocks,
    updateUserVotes,
    updateClickedUser,
    updateCurPointsPosition,
    updateIsEditing,
    getUserVoteblocks,
    getTimeSlotBlocks,
  } = useVoteBlockStore();
  const { open, setOpen, setTimeslots } = useGuestVoteStore();

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
      allvoteblocks,
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

      toast.success("已進入編輯模式");
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
  }, [user_votes, updateIsEditing]);

  // todo: implement
  const HandleScheduleButton = useCallback(() => {
    console.log("Schedule Button Click");
    // TODO: Implement schedule logic
  }, []);

  
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
            HandleCancelButton={HandleCancelButton}
          />
          {TimeLineComponent}
        </CardContent>
      </Card>
      <GuestDialog partyid={party.partyid} />
    </>
  );
};
