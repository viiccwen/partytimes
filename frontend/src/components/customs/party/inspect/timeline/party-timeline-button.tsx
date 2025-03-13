"use client";
import { useCallback } from "react";
import { toast } from "sonner";
import { CreateVote, DeleteVote } from "@/actions/vote-actions";
import { CreateSchedule, DeleteSchedule } from "@/actions/schedule-action";
import { GenerateTimeSlots } from "@/components/customs/party/inspect/timeline/party-timeline-helper";
import { useRouter } from "next/navigation";
import { useVoteBlockStore } from "@/stores/inspect-party-store";
import { useGuestVoteStore } from "@/stores/guest-vote-store";
import { getUserVoteblocks } from "@/lib/utils";
import { usePartyStore } from "@/stores/party-store";

interface PartyTimelineLogicProps {
  user_votes: Set<string>;
  userid: string | undefined;
}

export const PartyButton = ({
  user_votes,
  userid,
}: PartyTimelineLogicProps) => {
  const router = useRouter();
  const {
    vote_blocks,
    clicked_user,
    user_selected_block,
    isEditing,
    isScheduling,
    updateCurPointsPosition,
    updateSelectedBlock,
    updateClickedUser,
    updateIsEditing,
    updateIsScheduling,
    updateIsConfirmClicked,
    updateIsDeleteClicked,
    updateIsScheduledClicked,
  } = useVoteBlockStore();
  const { party } = usePartyStore();
  const isScheduled = party?.status;

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
        updateSelectedBlock(
          getUserVoteblocks(vote_blocks, clicked_user.creatorName),
        );
      }
      return;
    }

    if (user_selected_block.size === 0) {
      toast.error("請選擇時間區塊！");
      return;
    }

    const timeslots = GenerateTimeSlots(user_selected_block, party);

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

  const HandleScheduleButton = async () => {
    if (isScheduled) {
      toast.promise(DeleteSchedule(party.partyid), {
        loading: "刪除中...",
        success: () => {
          RefreshVoteData();
          return "刪除登記成功！";
        },
        error: (err) => err,
        finally: () => updateIsDeleteClicked(false),
      });
      return;
    }

    if (!isScheduling) {
      updateSelectedBlock(new Set<string>());
      updateIsScheduling(true);
      return;
    }

    if (user_selected_block.size === 0) {
      toast.error("請選擇時間區塊！");
      return;
    }

    updateIsScheduledClicked(true);
    const timeslot = GenerateTimeSlots(user_selected_block, party)[0];

    toast.promise(CreateSchedule(party.partyid, timeslot), {
      loading: "創建中...",
      success: () => {
        RefreshVoteData();
        return "創建登記成功！";
      },
      error: (err) => err,
      finally: () => {
        updateIsScheduling(false);
        updateIsDeleteClicked(false);
      },
    });
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

  const HandleCancelButton = () => {
    updateSelectedBlock(user_votes);
    updateIsEditing(false);
    updateIsScheduling(false);
  };

  return {
    HandleCheckButton,
    HandleCancelButton,
    HandleScheduleButton,
    HandleDeleteButton,
  };
};
