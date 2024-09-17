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
import { useGuestVoteStore } from "@/stores/guest-vote-store";
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

  const { setOpen, setTimeslots } = useGuestVoteStore();

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
      
      const token = Cookie.get("token");
      const isAuth = await CheckAuth(token);
      const timeslots = GenerateTimeSlots(userSelectBlock, party);

      if (!isAuth) {
        if(clicked_user.userId === "") {
          // show guest dialog & create vote by new guest user
          setTimeslots(timeslots);
          setOpen(true);
        } else {
          // create vote by old guest user
          setIsConfirmClicked(true);
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
            setIsConfirmClicked(false);
          }
        }
      } else {
        // create vote by login user
        setIsConfirmClicked(true);
        const res = await CreateVote(timeslots, party.partyid);
        if (!res.correct) toast.error(res.error);
        else {
          await RefreshVoteData();
          toast.success("創建投票成功！");
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
        toast.success("刪除登記成功！");
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
      toast.success("創建登記成功！");

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
    }

    setIsDeleteClicked(true);

    const res = await DeleteVote(party.partyid, clicked_user.userId);

    if (!res.correct) toast.error(res.error);
    else {
      await RefreshVoteData();
      toast.success("刪除投票成功！");
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
