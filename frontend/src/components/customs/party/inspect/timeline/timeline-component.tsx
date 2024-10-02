"use client";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  CalculateTotalHours,
  generateGridCells,
  generateHeader,
  GenerateScheduledBlock,
} from "@/components/customs/party/inspect/timeline/party-timeline-helper";
import { block_type, useVoteBlockStore } from "@/stores/inspect-party-store";
import { decision_schema_type, party_return_schema_type } from "@/lib/type";
import {
  ToggleBlockSchedule,
  ToggleBlockSelection,
} from "@/lib/block-selection-helper";

interface TimeLineComponentProps {
  party: party_return_schema_type;
  allvoteblocks: block_type[][][];
  VoteNumber: number;
  userSelectBlock: Set<string>;
  setUserSelectBlock: Dispatch<SetStateAction<Set<string>>>;
  isEditing: boolean;
  isScheduling: boolean;
  scheduled_time: decision_schema_type | null;
}

export const TimeLineComponent = ({
  party,
  allvoteblocks,
  VoteNumber,
  userSelectBlock,
  setUserSelectBlock,
  isEditing,
  isScheduling,
  scheduled_time,
}: TimeLineComponentProps) => {
  const [TouchedBlock, setTouchedBlock] = useState<string | null>(null);
  const {
    clicked_user,
    cur_points_userid,
    updateCurPointsPosition,
    updateIsMouseDown,
    isMouseDown,
    updateIsBounced,
  } = useVoteBlockStore();

  const handleClickTimeBlock = useCallback(
    (row: number, col: number) => {
      if (!isEditing && !isScheduling) {
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
        setUserSelectBlock((prev) => ToggleBlockSelection(prev, block_key));
      } else if (isScheduling) {
        if (!isMouseDown) setUserSelectBlock(new Set<string>());

        setUserSelectBlock((prev) => ToggleBlockSchedule(prev, col, row));
      }
    },
    [isEditing, isScheduling, isMouseDown, updateIsBounced]
  );

  return useMemo(() => {
    const total_half_hours = CalculateTotalHours(party) * 2;
    const gridCells = generateGridCells(
      party,
      total_half_hours,
      VoteNumber,
      userSelectBlock,
      isEditing,
      isScheduling,
      allvoteblocks,
      cur_points_userid,
      clicked_user,
      TouchedBlock,
      handleClickTimeBlock,
      updateCurPointsPosition,
      updateIsMouseDown,
      setTouchedBlock
    );

    const header = generateHeader(party);
    const scheduledBlock = GenerateScheduledBlock(party, scheduled_time);

    const container = (
      <div>
        {header}
        {scheduledBlock}
        {gridCells}
      </div>
    );

    return container;
  }, [
    party,
    handleClickTimeBlock,
    userSelectBlock,
    cur_points_userid,
    clicked_user,
    TouchedBlock,
    VoteNumber,
    allvoteblocks,
    isEditing,
    isScheduling,
    scheduled_time,
    updateCurPointsPosition,
    updateIsMouseDown,
    setTouchedBlock,
  ]);
};
