"use client";
import { Dispatch, SetStateAction, useCallback } from "react";
import { toast } from "sonner";
import { CreateVote, DeleteVote } from "@/actions/vote-actions";
import { CreateSchedule, DeleteSchedule } from "@/actions/schedule-action";
import { CheckAuth } from "@/actions/user-actions";
import { GenerateTimeSlots } from "@/components/customs/party/inspect/timeline/party-timeline-helper";
import { useRouter } from "next/navigation";
import { block_type, useVoteBlockStore } from "@/stores/inspect-party-store";
import { party_return_schema_type } from "@/lib/type";
const Cookie = require("js-cookie");

interface PartyTimelineLogicProps {
  setUserSelectBlock: Dispatch<SetStateAction<Set<string>>>;
  party: party_return_schema_type;
  userSelectBlock: Set<string>;
  user_votes: Set<string>;
  has_scheduled: boolean;
  allvoteblocks: block_type[][][];
  setIsConfirmClicked: Dispatch<SetStateAction<boolean>>;
  setIsDeleteClicked: Dispatch<SetStateAction<boolean>>;
  setIsScheduledClicked: Dispatch<SetStateAction<boolean>>;
  userid: number;
}

export const PartyTimelineLogic = ({
  setUserSelectBlock,
  party,
  userSelectBlock,
  has_scheduled,
  user_votes,
  allvoteblocks,
  setIsConfirmClicked,
  setIsDeleteClicked,
  setIsScheduledClicked,
  userid,
}: PartyTimelineLogicProps) => {
  const router = useRouter();
  const {
    clicked_user,
    isEditing,
    isScheduling,
    updateCurPointsPosition,
    updateClickedUser,
    updateIsEditing,
    updateIsScheduling,
    getUserVoteblocks,
  } = useVoteBlockStore();

  const HandleCheckButton = async () => {
    if (!isEditing) {
      updateIsEditing(true);

      if (clicked_user.userId !== "") {
        setUserSelectBlock(
          getUserVoteblocks(allvoteblocks, clicked_user.creatorName)
        );
      }
    } else if (userSelectBlock.size === 0) {
      toast.error("請選擇時間區塊！");
    } else {
      setIsConfirmClicked(true);
      const token = Cookie.get("token");
      const isAuth = await CheckAuth(token);
      const timeslots = GenerateTimeSlots(userSelectBlock, party);
      if (!isAuth) {
        toast.error("未授權用戶！");
      } else {
        const res = await CreateVote(timeslots, party.partyid);
        if (!res.correct) toast.error(res.error);
        else {
          await RefreshVoteData();
          toast.success("successfully create vote!");
          setIsConfirmClicked(false);
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
      setIsScheduledClicked(true);
      const timeslot = GenerateTimeSlots(userSelectBlock, party)[0];
      const res = await CreateSchedule(party.partyid, timeslot);

      if (!res.correct) {
        toast.error(res.error);
        return;
      }

      await RefreshVoteData();
      setUserSelectBlock(new Set<string>());
      toast.success("successfully create schedule!");

      updateIsScheduling(false);
      setIsScheduledClicked(false);
    }
  };

  const RefreshVoteData = async () => {
    updateCurPointsPosition(-1, -1);
    updateClickedUser("", "");
    updateIsEditing(false);
    router.refresh();
  };

  const HandleDeleteButton = useCallback(async () => {
    let delete_userid: number;
    if (clicked_user.userId === "" && userid === -1) {
      toast.error("請先選擇使用者!");
      return;
    } else if (clicked_user.userId === "" && userid !== -1) {
      delete_userid = userid;
    } else delete_userid = Number(clicked_user.userId);

    setIsDeleteClicked(true);

    const res = await DeleteVote(party.partyid, delete_userid);

    if (!res.correct) toast.error(res.error);
    else {
      await RefreshVoteData();
      toast.success("successfully delete vote!");
    }

    setIsDeleteClicked(false);
  }, [party.partyid, clicked_user.userId, userid, RefreshVoteData]);

  return {
    HandleCheckButton,
    HandleCancelButton,
    HandleScheduleButton,
    HandleDeleteButton,
    isEditing,
    isScheduling,
  };
};
