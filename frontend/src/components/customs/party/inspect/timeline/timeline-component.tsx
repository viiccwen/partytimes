"use client";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
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
  const block_ref = useRef<HTMLDivElement>(null);
  const [block_width, setBlockWidth] = useState<number>(0);
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

  useEffect(() => {
    const blockElement = block_ref.current;
    if(blockElement) {
      setBlockWidth(Math.floor(blockElement.clientWidth / 1.5));
    }
    
  }, []);

  return useMemo(() => {
    const total_hours = CalculateTotalHours(party);
    const total_half_hours = total_hours * 2;
    const header = generateHeader(party);
    const gridCells = generateGridCells(
      party,
      total_half_hours,
      VoteNumber,
      handleClickTimeBlock,
      userSelectBlock,
      isEditing,
      isScheduling,
      allvoteblocks,
      updateCurPointsPosition,
      updateIsMouseDown,
      cur_points_userid,
      clicked_user,
      TouchedBlock,
      setTouchedBlock,
      block_ref
    );

    const scheduledBlock = GenerateScheduledBlock(
      party,
      scheduled_time,
      block_width
    );

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
    block_width,
    isEditing,
    isScheduling,
    scheduled_time,
    updateCurPointsPosition,
    updateIsMouseDown,
    setTouchedBlock,
  ]);
};
