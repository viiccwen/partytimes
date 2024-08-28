import { block_type, clicked_user_type } from "@/stores/inspect-party-store";
import { party_return_schema_type, timeslots_create_schema_type } from "./type";
import { ReactNode } from "react";
import { cn } from "./utils";
import { ampm } from "./schema";

export const CalculateTotalHours = (
  party: party_return_schema_type
): number => {
  let start_time = party.start_time === 12 ? 0 : party.start_time;
  start_time =
    party.start_ampm === ampm[0] ? party.start_time : party.start_time + 12;

  let end_time = party.end_time === 12 ? 0 : party.end_time;
  end_time = party.end_ampm === ampm[0] ? party.end_time : party.end_time + 12;

  return end_time - start_time;
};

export const formatTime = (hour: number, ampm: string): string => {
  return `${hour > 12 ? hour - 12 : hour} ${
    hour >= 12 && ampm == "AM" ? "PM" : "AM"
  }`;
};

// bug: sometimes the grid is not working properly
export const generateGridCells = (
  party: party_return_schema_type,
  total_half_hours: number,
  VoteNumber: number,
  HandleClickTimeBlock: (row: number, col: number, isDragging: boolean) => void,
  userSelectBlock: Set<string>,
  isEditing: boolean,
  isScheduling: boolean,
  AllvoteBlocks: block_type[][][],
  updateCurPointsPosition: (row: number, col: number) => void,
  updateIsMouseDown: (isMouseDown: boolean) => void,
  cur_points_userid: string,
  clicked_user: clicked_user_type
): React.ReactElement => {
  const date_length = party.date.length;
  const pointed_status = cur_points_userid !== "";
  const clicked_status = clicked_user.userId !== "";

  const renderCell = (row: number, col: number) => {
    const block_key: string = `${col}-${row}`;
    const isSelected: boolean = userSelectBlock.has(block_key);
    const isScheduled: boolean = AllvoteBlocks[col][row].some(
      (block) => block.isScheduled
    );
    const isVoted: number = AllvoteBlocks[col][row].length;
    const isPointed: boolean = AllvoteBlocks[col][row].some(
      (block) => block.userId === cur_points_userid
    );
    const isClicked: boolean = AllvoteBlocks[col][row].some(
      (block) => block.userId === clicked_user.userId
    );

    const editingAppearance =
      isEditing || isScheduling
        ? "hover:cursor-row-resize select-none"
        : "hover:cursor-pointer";
    const borderAppearance =
      row % 2 == 0
        ? "border-t-2"
        : row == total_half_hours - 1
        ? "border-b-2"
        : "";

    const BlockAppearance = () => {
      if (!isEditing && !isScheduling) {
        // todo: change to another block
        if(isScheduled) return "bg-orange-400";

        if (clicked_status) {
          return isClicked ? "bg-blue-400" : "";
        } else if (pointed_status) {
          return isPointed ? "bg-blue-400" : "";
        }
        return isVoted ? DecideBlockColor(VoteNumber, isVoted) : "";
      } else {
        return isSelected ? "bg-blue-400" : "";
      }
    };

    return (
      <div
        key={block_key}
        className={cn(
          "border-x border-gray-400 h-[24px] col-auto hover:border-2 hover:border-dashed",
          editingAppearance,
          borderAppearance,
          BlockAppearance()
        )}
        onMouseDown={() => {
          updateIsMouseDown(true);
          HandleClickTimeBlock(row, col, false);
        }}
        onMouseUp={() => {
          updateIsMouseDown(false);
        }}
        onMouseEnter={(e) => {
          updateCurPointsPosition(col, row);
          if (e.buttons === 1) HandleClickTimeBlock(row, col, true);
        }}
        onDragStart={(e) => e.preventDefault()}
        onMouseLeave={() => updateCurPointsPosition(-1, -1)}
      >
        {/* todo: add scheduled block */}
        {/* {isScheduled ? "scheduled" : ""} */}
        </div>
    );
  };

  const renderRow = (row: number) => {
    const hour = Math.floor(row / 2);
    const time =
      row % 2 === 0
        ? formatTime(party.start_time + hour, party.start_ampm)
        : "";

    return (
      <div key={row} className="flex">
        <div className="flex justify-end items-center w-[60px] text-slate-600 select-none">
          {time}
        </div>
        <div className={`grid grid-cols-${date_length} w-full ml-2`}>
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

export const generateHeader = (party: party_return_schema_type): ReactNode => {
  return (
    <div className="flex mt-5">
      <div className="w-[60px]"></div>
      {/* bug: grid is not working properly */}
      <div className={`w-full ml-2 grid grid-cols-5`}>
        {party.date.map((date) => (
          <div key={date} className="text-center">
            {date}
          </div>
        ))}
      </div>
    </div>
  );
};

export const GetTimeWithAMPM = (time: number, ampm: string) => {
  let new_ampm = ampm;
  new_ampm = (time >= 12 && ampm === "AM") || time === 0 ? "PM" : "AM";

  return new_ampm;
};

export const GenerateTimeSlots = (
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

export const DecideBlockColor: (all: number, selected: number) => string = (
  all: number,
  selected: number
) => {
  const percentage = (selected / all) * 100;
  if (percentage <= 25) return "bg-blue-300";
  if (percentage <= 50) return "bg-blue-400";
  if (percentage <= 75) return "bg-blue-500";
  if (percentage < 100) return "bg-blue-600";
  if (percentage == 100) return "bg-blue-700";
  return "bg-blue-400";
};
