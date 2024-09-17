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
import { ToggleBlockSchedule, ToggleBlockSelection } from "@/lib/block-selection-helper";

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
  const blockElement = document.getElementsByClassName("block").item(0);
  const block_width = blockElement
    ? parseFloat(blockElement.clientWidth.toString()) / 1.5
    : 0;

  const {
    clicked_user,
    cur_points_userid,
    updateCurPointsPosition,
    updateIsMouseDown,
    isMouseDown,
    updateIsBounced,
  } = useVoteBlockStore();

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
        setUserSelectBlock((prev) => ToggleBlockSelection(prev, block_key));
      } else if (isScheduling) {
        if (!isMouseDown) setUserSelectBlock(new Set<string>());

        setUserSelectBlock((prev) => ToggleBlockSchedule(prev, col, row));
      }
    },
    [isEditing, isScheduling, isMouseDown, updateIsBounced]
  );

  return useMemo(() => {
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
      clicked_user,
      TouchedBlock,
      setTouchedBlock
    );

    const scheduledBlock = GenerateScheduledBlock(
      party,
      scheduled_time,
      block_width
    );

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
    TouchedBlock,
    VoteNumber,
    allvoteblocks,
    block_width,
    isEditing,
    isScheduling,
    scheduled_time,
    updateCurPointsPosition,
    updateIsMouseDown,
    setTouchedBlock,
  ]);
};
