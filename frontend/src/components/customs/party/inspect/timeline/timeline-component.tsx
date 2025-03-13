"use client";
import { useEffect, useMemo, useState } from "react";
import {
  generateGridCells,
  generateHeader,
  GenerateScheduledBlock,
} from "@/components/customs/party/inspect/timeline/party-timeline-helper";
import { useVoteBlockStore } from "@/stores/inspect-party-store";
import { CalculateTotalHours } from "@/lib/utils";
import { usePartyStore } from "@/stores/party-store";
import { useTimelineUserStore } from "@/stores/timeline-user-store";

export const TimeLineComponent = () => {
  const [TouchedBlock, setTouchedBlock] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const { party } = usePartyStore();
  const { join_lists } = useTimelineUserStore();
  const {
    vote_blocks,
    user_selected_block,
    clicked_user,
    cur_points_userid,
    isEditing,
    isScheduling,
    start_points,
    updateSelectedBlock,
    updateCurPointsPosition,
    updateIsMouseDown,
    updateIsBounced,
    updateStartPoints,
  } = useVoteBlockStore();
  const scheduled_time = party.decision;

  const handleClickTimeBlock = (
    row: number,
    col: number,
    isDragging: boolean,
    isMobile: boolean,
  ) => {
    if (!isEditing && !isScheduling) {
      if (isMobile) return;

      // bounce animation effect
      const bounceTimings = [150, 300, 450, 600];
      bounceTimings.forEach((time, index) => {
        setTimeout(() => {
          updateIsBounced(index % 2 === 0);
        }, time);
      });
      return;
    }

    if (!isDragging) {
      updateStartPoints(row, col);
      setIsAdding(!user_selected_block.has(`${col}-${row}`));
      return;
    }

    if (start_points.col != -1 && start_points.row != -1) {
      const { row: start_row, col: start_col } = start_points;
      const end_row = row;
      const end_col = col;

      // calculate selected range（ensure left-top -> right-down）
      const min_row = Math.min(start_row, end_row);
      const max_row = Math.max(start_row, end_row);
      const min_col = Math.min(start_col, end_col);
      const max_col = Math.max(start_col, end_col);

      const selectedBlocks = new Set<string>(user_selected_block);

      for (let r = min_row; r <= max_row; r++) {
        for (let c = min_col; c <= max_col; c++) {
          const block = `${c}-${r}`;

          if (isAdding) selectedBlocks.add(block);
          else selectedBlocks.delete(block);
        }
      }

      updateSelectedBlock(new Set(selectedBlocks));
    }
  };
  const total_half_hours = useMemo(
    () => CalculateTotalHours(party) * 2,
    [party],
  );
  const header = useMemo(() => generateHeader(party), [party]);
  const schedule_block = useMemo(
    () => GenerateScheduledBlock(party, scheduled_time),
    [party, scheduled_time],
  );

  return useMemo(() => {
    const gridCells = generateGridCells(
      party,
      total_half_hours,
      join_lists.length,
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
      setTouchedBlock,
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
    join_lists.length,
    TouchedBlock,
    updateCurPointsPosition,
    updateIsMouseDown,
    setTouchedBlock,
  ]);
};
