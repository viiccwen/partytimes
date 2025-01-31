"use client";
import { useMemo, useState } from "react";
import {
  generateGridCells,
  generateHeader,
  GenerateScheduledBlock,
} from "@/components/customs/party/inspect/timeline/party-timeline-helper";
import { block_type, useVoteBlockStore } from "@/stores/inspect-party-store";
import {
  ToggleBlockSchedule,
  ToggleBlockSelection,
} from "@/lib/block-selection-helper";
import { CalculateTotalHours } from "@/lib/utils";
import { usePartyStore } from "@/stores/party-store";

interface TimeLineComponentProps {
  VoteNumber: number;
}

export const TimeLineComponent = ({
  VoteNumber,
}: TimeLineComponentProps) => {
  const [TouchedBlock, setTouchedBlock] = useState<string | null>(null);
  const { party } = usePartyStore();
  const {
    vote_blocks,
    user_selected_block,
    clicked_user,
    cur_points_userid,
    updateSelectedBlock,
    updateCurPointsPosition,
    updateIsMouseDown,
    isMouseDown,
    updateIsBounced,
    isEditing,
    isScheduling,
  } = useVoteBlockStore();
  const scheduled_time = party.decision;

  const handleClickTimeBlock = (row: number, col: number) => {
    if (!isEditing && !isScheduling) {
      // bounce animation effect
      const bounceTimings = [150, 300, 450, 600];
      bounceTimings.forEach((time, index) => {
        setTimeout(() => {
          updateIsBounced(index % 2 === 0);
        }, time);
      });
      return;
    }

    const block_key = `${col}-${row}`;

    if (isEditing) {
      updateSelectedBlock(ToggleBlockSelection(user_selected_block, block_key));
    } else if (isScheduling) {
      if (!isMouseDown) updateSelectedBlock(new Set<string>());
      updateSelectedBlock(ToggleBlockSchedule(user_selected_block, col, row));
    }
  };

  const total_half_hours = useMemo(
    () => CalculateTotalHours(party) * 2,
    [party]
  );
  const header = useMemo(() => generateHeader(party), [party]);
  const schedule_block = useMemo(
    () => GenerateScheduledBlock(party, scheduled_time),
    [party, scheduled_time]
  );

  return useMemo(() => {
    const gridCells = generateGridCells(
      party,
      total_half_hours,
      VoteNumber,
      user_selected_block,
      isEditing,
      isScheduling,
      vote_blocks,
      cur_points_userid,
      clicked_user,
      TouchedBlock,
      handleClickTimeBlock,
      updateCurPointsPosition,
      updateIsMouseDown,
      setTouchedBlock
    );

    return (
      <div>
        {header}
        {schedule_block}
        {gridCells}
      </div>
    );
  }, [
    party,
    handleClickTimeBlock,
    user_selected_block,
    cur_points_userid,
    clicked_user,
    vote_blocks,
    isEditing,
    isScheduling,
    VoteNumber,
    TouchedBlock,
    updateCurPointsPosition,
    updateIsMouseDown,
    setTouchedBlock,
  ]);
};
