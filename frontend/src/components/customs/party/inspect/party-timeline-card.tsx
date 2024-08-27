"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { PartyHeader } from "./party-header";
import { PartyTimelineHeader } from "./party-timeline-header";

import { ampm } from "@/lib/schema";
import {
  party_return_schema_type,
  timeslots_create_schema_type,
} from "@/lib/type";
import { CreateVote } from "@/actions/vote-actions";
import { useVoteBlockStore } from "./inspect-party-container";

interface PartyTimelineCardProps {
  className?: string;
  party: party_return_schema_type;
  AllvoteBlocks: block_type[][][];
  userVoteBlocks: Set<string>;
  VoteNumber: number;
}

type block_type = {
  creatorName: string;
};

const Cookie = require("js-cookie");

let allVoteNumber: number;

export const PartyTimelineCard = ({
  className,
  party,
  AllvoteBlocks,
  userVoteBlocks,
  VoteNumber,
}: PartyTimelineCardProps) => {
  const [timeLineComponent, setTimeLineComponent] = useState<ReactElement>();
  const [userSelectBlock, setUserSelectBlock] =
    useState<Set<string>>(userVoteBlocks);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState<boolean>(false);

  const updateCurPointsPosition = useVoteBlockStore(
    (state) => state.updateCurPointsPosition
  );

  allVoteNumber = VoteNumber;

  const HandleClickTimeBlock = useCallback(
    (row: number, col: number, isDragging: boolean) => {
      if (!isEditing) {
        toast.error("請先進入編輯模式");
        return;
      }

      const block_key = `${col}-${row}`;
      setUserSelectBlock((prev) => {
        if (prev.has(block_key)) prev.delete(block_key);
        else prev.add(block_key);

        return new Set(prev);
      });
    },
    [isEditing]
  );

  useEffect(() => {
    const total_hours = CalculateTotalHours(party);
    const total_half_hours = total_hours * 2;
    const header = generateHeader(party);
    const gridCells = generateGridCells(
      party,
      total_half_hours,
      HandleClickTimeBlock,
      userSelectBlock,
      isEditing,
      AllvoteBlocks,
      updateCurPointsPosition
    );

    const container = (
      <div>
        {header}
        {gridCells}
      </div>
    );

    setTimeLineComponent(container);
  }, [party, HandleClickTimeBlock, userSelectBlock]);

  const HandleCheckButton = () => {
    if (!isEditing) {
      setIsEditing(true);
      toast.success("已進入編輯模式");
    } else if (userSelectBlock.size === 0) {
      toast.error("請選擇時間區塊！");
    } else {
      const timeslots = GenerateTimeSlots(userSelectBlock, party);

      const func = async () => {
        const res = await CreateVote(timeslots, party.partyid);

        if (!res.correct) toast.error(res.error);
        else {
          toast.success("已成功送出投票");
          window.location.reload();
        }
      };

      func();
    }
  };

  const HandleCancelButton = () => {
    setUserSelectBlock(userVoteBlocks);
    setIsEditing(false);
  };

  // todo: implement
  const HandleScheduleButton = () => {
    console.log("Schedule Button Click");
  };

  useEffect(() => {
    setHydrated(true);

    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUp);

    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  if (!hydrated) {
    return null;
  } else {
    return (
      <Card className={className}>
        <CardContent>
          <PartyHeader className="mt-5" party={party} />
          <Separator className="h-1 my-3" />
          <PartyTimelineHeader
            className="mt-5"
            party={party}
            HandleCheckButton={HandleCheckButton}
            HandleScheduleButton={HandleScheduleButton}
            isEditing={isEditing}
            HandleCancelButton={HandleCancelButton}
          />
          {timeLineComponent}
        </CardContent>
      </Card>
    );
  }
};

const CalculateTotalHours = (party: party_return_schema_type): number => {
  let start_time = party.start_time === 12 ? 0 : party.start_time;
  start_time =
    party.start_ampm === ampm[0] ? party.start_time : party.start_time + 12;

  let end_time = party.end_time === 12 ? 0 : party.end_time;
  end_time = party.end_ampm === ampm[0] ? party.end_time : party.end_time + 12;

  return end_time - start_time;
};

const formatTime = (hour: number, ampm: string): string => {
  return `${hour > 12 ? hour - 12 : hour} ${
    hour >= 12 && ampm == "AM" ? "PM" : "AM"
  }`;
};

// bug: sometimes the grid is not working properly

const generateGridCells = (
  party: party_return_schema_type,
  total_half_hours: number,
  HandleTimeBlock: (row: number, col: number, isDragging: boolean) => void,
  userSelectBlock: Set<string>,
  isEditing: boolean,
  AllvoteBlocks: block_type[][][],
  updateCurPointsPosition: (row: number, col: number) => void
): ReactNode[] => {
  let components: ReactNode[] = [];
  const date_length = party.date.length;

  for (let row = 0; row < total_half_hours; row++) {
    let rowCells: ReactNode[] = [];
    for (let col = 0; col < date_length; col++) {
      const block_key: string = `${col}-${row}`;
      const isSelected: boolean = userSelectBlock.has(block_key);
      const isVoted: number = AllvoteBlocks[col][row].length;

      rowCells.push(
        <div
          key={block_key}
          className={`
            ${
              row % 2 == 0
                ? "border-t-2"
                : row == total_half_hours - 1
                ? "border-b-2"
                : ""
            } ${
            isEditing
              ? `hover:cursor-row-resize select-none ${
                  isSelected ? "bg-blue-400" : ""
                }`
              : `hover:cursor-pointer ${
                  isVoted ? DecideBlockColor(allVoteNumber, isVoted) : ""
                }`
          }
          border-x border-slate-500 h-[24px] col-auto hover:border-2 hover:border-dashed 
          `}
          onMouseDown={() => HandleTimeBlock(row, col, false)}
          onMouseEnter={(e) => {
            updateCurPointsPosition(col, row);
            if (e.buttons === 1) HandleTimeBlock(row, col, true);
          }}
          onDragStart={(e) => e.preventDefault()}
        ></div>
      );
    }

    const hour = Math.floor(row / 2);
    const time =
      row % 2 === 0
        ? formatTime(party.start_time + hour, party.start_ampm)
        : "";

    // bug: sometimes the grid is not working properly
    const grid_cols = `grid-cols-5`;

    components.push(
      <div key={row} className="flex">
        <div className="flex justify-end items-center w-[60px] text-slate-600 select-none">
          {time}
        </div>
        <div className={`grid ${grid_cols} w-full ml-2`}>{rowCells}</div>
      </div>
    );
  }

  return components;
};

const generateHeader = (party: party_return_schema_type): ReactNode => {
  return (
    <div className="flex mt-5">
      <div className="w-[60px]"></div>
      <div className={`w-full ml-2 grid grid-cols-${party.date.length}`}>
        {party.date.map((date) => (
          <div key={date} className="text-center">
            {date}
          </div>
        ))}
      </div>
    </div>
  );
};

const GetTimeWithAMPM = (time: number, ampm: string) => {
  let new_ampm = ampm;
  new_ampm = (time >= 12 && ampm === "AM") || time === 0 ? "PM" : "AM";

  return new_ampm;
};

const GenerateTimeSlots = (
  userSelectBlock: Set<string>,
  party: party_return_schema_type
) => {
  const blocks = Array.from(userSelectBlock);

  const raw_timeSlots = blocks.map((block) => {
    const [row, col] = block.split("-").map((v) => parseInt(v));
    return { row, col };
  });

  raw_timeSlots.sort((a, b) => {
    return a.row !== b.row ? a.row - b.row : a.col - b.col;
  });

  // merge continuous blocks into one

  let prev = { row: -1, col: -1 };
  let start_time: number = -1;
  let start_ampm: string = "";
  let end_time: number = -1;
  let end_ampm: string = "";
  let timeSlots: timeslots_create_schema_type = [];

  for (let i = 0; i < raw_timeSlots.length; i++) {
    const cur = raw_timeSlots[i];
    if (prev.row === -1 && prev.col === -1) {
      start_time = party.start_time + cur.col / 2;
      start_ampm = GetTimeWithAMPM(start_time, party.start_ampm);
      end_time = party.start_time + (cur.col + 1) / 2;
      end_ampm = GetTimeWithAMPM(end_time, party.start_ampm);
      prev = cur;
    } else if (cur.row === prev.row && cur.col === prev.col + 1) {
      end_time = party.start_time + (cur.col + 1) / 2;
      end_ampm = GetTimeWithAMPM(end_time, party.start_ampm);
      prev = cur;
    } else {
      // change to 12 hours format
      if (start_time >= 12) start_time -= 12;
      if (end_time >= 12) end_time -= 12;

      timeSlots.push({
        date: party.date[prev.row],
        start_time: start_time,
        start_ampm: start_ampm === "AM" ? "AM" : "PM",
        end_time: end_time,
        end_ampm: end_ampm === "AM" ? "AM" : "PM",
      });

      start_time = party.start_time + cur.col / 2;
      start_ampm = GetTimeWithAMPM(start_time, party.start_ampm);
      end_time = party.start_time + (cur.col + 1) / 2;
      end_ampm = GetTimeWithAMPM(end_time, party.start_ampm);
      prev = cur;
    }
  }

  // check for last one time slot
  if (start_time !== -1 && end_time !== -1) {
    // change to 12 hours format
    if (start_time >= 12) start_time -= 12;
    if (end_time >= 12) end_time -= 12;

    timeSlots.push({
      date: party.date[raw_timeSlots[raw_timeSlots.length - 1].row],
      start_time: start_time,
      start_ampm: start_ampm === "AM" ? "AM" : "PM",
      end_time: end_time,
      end_ampm: end_ampm === "AM" ? "AM" : "PM",
    });
  }

  return timeSlots;
};

const DecideBlockColor = (all: number, selected: number) => {
  const percentage = (selected / all) * 100;
  if (percentage <= 25) return "bg-blue-300";
  if (percentage <= 50) return "bg-blue-400";
  if (percentage <= 75) return "bg-blue-500";
  if (percentage < 100) return "bg-blue-600";
  if (percentage == 100) return "bg-blue-700";
};
