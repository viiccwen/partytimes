"use client";
import { block_type, clicked_user_type } from "@/stores/inspect-party-store";
import {
  decision_schema_type,
  party_return_schema_type,
  timeslots_create_schema_type,
} from "@/lib/type";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { cn, ConvertTo24Hours } from "@/lib/utils";
import { CalendarCheck2 } from "lucide-react";

export const formatTime = (hour: number): string => {
  if (hour === 0 || hour == 24) return "12 AM";
  if (hour === 12) return "12 PM";
  if (hour < 12) return `${hour} AM`;
  if (hour > 12) return `${hour - 12} PM`;
  return "";
};

export const generateGridCells = (
  party: party_return_schema_type,
  total_half_hours: number,
  VoteNumber: number,
  userSelectBlock: Set<string>,
  isEditing: boolean,
  isScheduling: boolean,
  vote_blocks: block_type[][][],
  cur_points_userid: string,
  clicked_user: clicked_user_type,
  TouchedBlock: string | null,
  handleClickTimeBlock: (row: number, col: number, isDragging: boolean) => void,
  updateCurPointsPosition: (row: number, col: number) => void,
  updateIsMouseDown: (isMouseDown: boolean) => void,
  updateTouchedBlock: Dispatch<SetStateAction<string | null>>
): React.ReactElement => {
  if (!party || !party.date) return <></>;

  const date_length = party.date.length;

  const renderCell = (row: number, col: number) => {
    const block_key: string = `${col}-${row}`;
    const isSelected: boolean = userSelectBlock.has(block_key);
    const isVoted: number = vote_blocks[col][row].length;
    const isPointed: boolean = vote_blocks[col][row].some(
      (block) => block.userId === cur_points_userid
    );
    const isClicked: boolean = vote_blocks[col][row].some(
      (block) => block.userId === clicked_user.userId
    );

    const getBlockAppearance = (): string => {
      if (!isEditing && !isScheduling) {
        if (clicked_user.userId) return isClicked ? "bg-blue-400" : "";
        if (cur_points_userid) return isPointed ? "bg-blue-400" : "";
        return isVoted ? DecideBlockColor(VoteNumber, isVoted) : "";
      } else if (isScheduling) {
        return isSelected
          ? "bg-orange-400"
          : isVoted
          ? DecideBlockColor(VoteNumber, isVoted)
          : "";
      } else {
        return isSelected ? "bg-blue-400" : "";
      }
    };

    return (
      <div
        key={block_key}
        id={block_key}
        className={cn(
          "block touch-none border-r-[1px] border-slate-400 h-[24px] col-auto hover:border-[1px] md:hover:border-dashed",
          row % 2 === 0
            ? "border-t-[1px]"
            : row === total_half_hours - 1
            ? "border-b-[1px]"
            : "",
          col === 0
            ? "border-l-[1px]"
            : col === date_length - 1
            ? "border-r-[1px]"
            : "",
          isEditing || isScheduling
            ? "hover:cursor-row-resize select-none"
            : "hover:cursor-pointer",
          getBlockAppearance()
        )}
        onTouchStart={(e) => {
          e.preventDefault();
          updateIsMouseDown(true);
          handleClickTimeBlock(row, col, false);
          updateTouchedBlock(e.currentTarget.id);
        }}
        onTouchMove={(e) => {
          e.preventDefault();
          if (e.touches.length === 1) {
            const touch = e.touches[0];
            const element = document.elementFromPoint(
              touch.clientX,
              touch.clientY
            );
            const block_id = element?.id;
            if (element && block_id && block_id !== TouchedBlock) {
              const [col, row] = block_id.split("-").map(Number);
              updateCurPointsPosition(col, row);
              handleClickTimeBlock(row, col, true);
              updateTouchedBlock(block_id);
            }
          }
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          updateIsMouseDown(false);
          updateCurPointsPosition(-1, -1);
        }}
        onMouseDown={() => {
          updateIsMouseDown(true);
          handleClickTimeBlock(row, col, false);
        }}
        onMouseUp={() => {
          updateIsMouseDown(false);
        }}
        onMouseEnter={(e) => {
          updateCurPointsPosition(col, row);
          if (e.buttons === 1) handleClickTimeBlock(row, col, true);
        }}
        onDragStart={(e) => e.preventDefault()}
        onMouseLeave={() => updateCurPointsPosition(-1, -1)}
      ></div>
    );
  };

  const renderRow = (row: number) => {
    const hour = Math.floor(row / 2);
    const start_time = ConvertTo24Hours(
      party.start_time,
      party.start_ampm,
      true
    );
    const time = row % 2 === 0 ? formatTime(start_time + hour) : "";

    return (
      <div key={row} className="flex">
        <div className="text-sm flex justify-start items-center w-[50px] text-slate-600 dark:text-slate-100 select-none">
          {time}
        </div>
        <div
          className={`grid w-full ml-2`}
          style={{
            gridTemplateColumns: `repeat(${party.date.length}, 1fr)`,
          }}
        >
          {Array.from({ length: date_length }, (_, col) =>
            renderCell(row, col)
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-2">
      {Array.from({ length: total_half_hours }, (_, row) => renderRow(row))}
    </div>
  );
};

export const GenerateScheduledBlock = (
  party: party_return_schema_type,
  scheduled_time: decision_schema_type | undefined | null
) => {
  if (!scheduled_time) return null;

  const date = scheduled_time.date;
  const row = party.date.findIndex((v) => v === date);
  const start =
    ConvertTo24Hours(
      scheduled_time.start_time,
      scheduled_time.start_ampm,
      true
    ) - ConvertTo24Hours(party.start_time, party.start_ampm, true);
  const end =
    ConvertTo24Hours(scheduled_time.end_time, scheduled_time.end_ampm, false) -
    ConvertTo24Hours(party.start_time, party.start_ampm, true);
  const height = (end - start) * 2;
  const top = start * 2;

  return (
    <div className="mt-2 relative">
      <div
        className="hover:cursor-pointer absolute z-10 bg-orange-400 rounded-lg h-full flex justify-center items-center text-white"
        style={{
          top: `${top * 1.5}rem`,
          left: `calc(40px + ((100% - 40px) * ${row} / ${party.date.length}) + 30px)`,
          width: `calc((100% - 40px) / ${party.date.length} - 40px)`,
          maxWidth: `calc(100% / ${party.date.length} - 8px)`,
          height: `${height * 24}px`,
        }}
      >
        <div className="text-xs flex flex-col">
          <CalendarCheck2 className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export const generateHeader = (party: party_return_schema_type): ReactNode => {
  if (!party || !party.date) return null;

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const getWeekday = (dateString: string) => {
    const date = new Date(dateString);
    // const date = moment(dateString, moment.ISO_8601, true);
    return weekdays[date.getDay()];
  };

  return (
    <div className="flex mt-5">
      <div className="w-[50px]"></div>
      <div
        className={`w-full ml-2 grid`}
        style={{
          gridTemplateColumns: `repeat(${party.date.length}, 1fr)`,
        }}
      >
        {party.date.map((date) => (
          <div key={date} className="text-center">
            <div className="text-xs text-slate-400">{getWeekday(date)}</div>
            <div className="text-sm">{date.slice(5).replace("-", "/")}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const GetTimeWithAMPM = (time: number) => {
  if (time === 0 || time === 24) return "AM";
  if (time === 12) return "PM";
  return time < 12 ? "AM" : "PM";
};

export const GenerateTimeSlots = (
  userSelectBlock: Set<string>,
  party: party_return_schema_type
) => {
  const blocks = Array.from(userSelectBlock);
  const party_start_time = ConvertTo24Hours(
    party.start_time,
    party.start_ampm,
    true
  );

  const raw_timeSlots = blocks.map((block) => {
    const [row, col] = block.split("-").map((v) => parseInt(v));
    return { row, col };
  });

  raw_timeSlots.sort((a, b) => {
    return a.row !== b.row ? a.row - b.row : a.col - b.col;
  });

  // merge continuous blocks into one
  let timeSlots: timeslots_create_schema_type = [];
  let prev = { row: -1, col: -1 };
  let start_time: number = -1;
  let start_ampm: string = "";
  let end_time: number = -1;
  let end_ampm: string = "";

  for (let i = 0; i < raw_timeSlots.length; i++) {
    const cur = raw_timeSlots[i];
    if (prev.row === -1 && prev.col === -1) {
      start_time = party_start_time + cur.col / 2;
      start_ampm = GetTimeWithAMPM(start_time);
      end_time = party_start_time + (cur.col + 1) / 2;
      end_ampm = GetTimeWithAMPM(end_time);
    } else if (cur.row === prev.row && cur.col === prev.col + 1) {
      end_time = party_start_time + (cur.col + 1) / 2;
      end_ampm = GetTimeWithAMPM(end_time);
    } else {
      // change to 12 hours format
      if (start_time >= 12) start_time -= 12;
      if (end_time === 24) end_time = 0;
      else if (end_time >= 12) end_time -= 12;

      timeSlots.push({
        date: party.date[prev.row],
        start_time: start_time,
        start_ampm: start_ampm === "AM" ? "AM" : "PM",
        end_time: end_time,
        end_ampm: end_ampm === "AM" ? "AM" : "PM",
      });

      start_time = party_start_time + cur.col / 2;
      start_ampm = GetTimeWithAMPM(start_time);
      end_time = party_start_time + (cur.col + 1) / 2;
      end_ampm = GetTimeWithAMPM(end_time);
    }

    prev = cur;
  }

  // check for last one time slot
  if (start_time !== -1 && end_time !== -1) {
    // change to 12 hours format
    if (start_time >= 12) start_time -= 12;
    if (end_time === 24) end_time = 0;
    else if (end_time >= 12) end_time -= 12;

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

export const DecideBlockColor: (all: number, selected: number) => string = (
  all: number,
  selected: number
) => {
  const percentage = (selected / all) * 100;
  if (percentage <= 25) return "bg-blue-300";
  if (percentage <= 50) return "bg-blue-400";
  if (percentage <= 75) return "bg-blue-500";
  if (percentage < 100) return "bg-blue-600";
  return "bg-blue-700";
};
