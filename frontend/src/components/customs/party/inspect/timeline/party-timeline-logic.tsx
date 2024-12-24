"use client";
import { Dispatch, SetStateAction, useCallback } from "react";
import { toast } from "sonner";
import { CreateVote, DeleteVote } from "@/actions/vote-actions";
import { CreateSchedule, DeleteSchedule } from "@/actions/schedule-action";
import { GenerateTimeSlots } from "@/components/customs/party/inspect/timeline/party-timeline-helper";
import { useRouter } from "next/navigation";
import { block_type, useVoteBlockStore } from "@/stores/inspect-party-store";
import { party_return_schema_type } from "@/lib/type";
import { useGuestVoteStore } from "@/stores/guest-vote-store";
import { getUserVoteblocks } from "@/lib/utils";

interface PartyTimelineLogicProps {
  party: party_return_schema_type;
  allvoteblocks: block_type[][][];
  user_votes: Set<string>;
  userid: string | undefined;
  userSelectBlock: Set<string>;
  setUserSelectBlock: Dispatch<SetStateAction<Set<string>>>;
}

export const PartyTimelineLogic = ({
  party,
  allvoteblocks,
  user_votes,
  userid,
  userSelectBlock,
  setUserSelectBlock,
}: PartyTimelineLogicProps) => {
  const router = useRouter();
  const isScheduled = party.status;
  const {
    clicked_user,
    isEditing,
    isScheduling,
    updateCurPointsPosition,
    updateClickedUser,
    updateIsEditing,
    updateIsScheduling,
    updateIsConfirmClicked,
    updateIsDeleteClicked,
    updateIsScheduledClicked,
  } = useVoteBlockStore();

  const { setOpen, setTimeslots } = useGuestVoteStore();

  const RefreshVoteData = async () => {
    updateCurPointsPosition(-1, -1);
    updateClickedUser("", "");
    updateIsEditing(false);
    router.refresh();
  };

  const HandleCheckButton = async () => {
    if (!isEditing) {
      updateIsEditing(true);
      if (clicked_user.userId !== "") {
        setUserSelectBlock(
          getUserVoteblocks(allvoteblocks, clicked_user.creatorName)
        );
      }
      return;
    }

    if (userSelectBlock.size === 0) {
      toast.error("請選擇時間區塊！");
      return;
    }

    const timeslots = GenerateTimeSlots(userSelectBlock, party);

    // New Guest User
    if (!userid && clicked_user.userId === "") {
      setTimeslots(timeslots);
      setOpen(true);
      return;

      // Existing Guest User or Authenticated User
    } else {
      updateIsConfirmClicked(true);

      const body = {
        partyid: party.partyid,
        nickname: clicked_user.creatorName,
        guestid: clicked_user.userId,
        timeslots,
      };
      toast.promise(CreateVote(body), {
        loading: "創建中...",
        success: () => {
          RefreshVoteData();
          return "創建投票成功！";
        },
        error: (err) => err,
        finally: () => updateIsConfirmClicked(false),
      });
    }
  };

  const HandleCancelButton = () => {
    setUserSelectBlock(user_votes);
    updateIsEditing(false);
    updateIsScheduling(false);
  };

  const HandleScheduleButton = async () => {
    if (isScheduled) {
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
      return;
    }

    if (userSelectBlock.size === 0) {
      toast.error("請選擇時間區塊！");
      return;
    }

    updateIsScheduledClicked(true);
    const timeslot = GenerateTimeSlots(userSelectBlock, party)[0];
    const res = await CreateSchedule(party.partyid, timeslot);

    res.correct
      ? (await RefreshVoteData(), toast.success("創建登記成功！"))
      : toast.error(res.error);

    updateIsScheduling(false);
    updateIsScheduledClicked(false);
  };

  const HandleDeleteButton = useCallback(async () => {
    if (clicked_user.userId === "" && userid === undefined) {
      toast.error("請先選擇使用者!");
      return;
    }

    updateIsDeleteClicked(true);

    if (clicked_user.userId !== "") {
      toast.promise(DeleteVote(party.partyid, clicked_user.userId), {
        loading: "刪除中...",
        success: () => {
          RefreshVoteData();
          return "刪除投票成功！";
        },
        error: (err) => err,
        finally: () => updateIsDeleteClicked(false),
      });
    } else {
      toast.promise(DeleteVote(party.partyid, userid), {
        loading: "刪除中...",
        success: () => {
          RefreshVoteData();
          return "刪除投票成功！";
        },
        error: (err) => err,
        finally: () => updateIsDeleteClicked(false),
      });
    }
  }, [party, clicked_user, userid]);

  return {
    HandleCheckButton,
    HandleCancelButton,
    HandleScheduleButton,
    HandleDeleteButton,
    isEditing,
    isScheduling,
  };
};
