"use client";
import { Card, CardContent } from "@/components/ui/card";
import { party_return_schema_type, timeslots_create_schema_type, votes_schema_type } from "@/lib/type";
import {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { PartyTimelineHeader } from "./party-timeline-header";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { PartyHeader } from "./party-header";
import { ampm } from "@/lib/schema";
import { CreateVote } from "@/actions/vote-actions";

interface PartyTimelineCardProps {
  className?: string;
  party: party_return_schema_type;
  votes: votes_schema_type;
}

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
  selectBlock: Set<string>,
  isEditing: boolean
): ReactNode[] => {
  let components: ReactNode[] = [];
  const date_length = party.date.length;

  for (let row = 0; row < total_half_hours; row++) {
    let rowCells: ReactNode[] = [];
    for (let col = 0; col < date_length; col++) {
      const block_key = `${col}-${row}`;
      const isSelected = selectBlock.has(block_key);

      rowCells.push(
        <div
          key={block_key}
          className={`${
            row % 2 == 0
              ? "border-t-2"
              : (row == total_half_hours - 1
              ? "border-b-2"
              : "")
          } border-x border-slate-500 h-[24px] col-auto hover:border-2 hover:border-dashed hover:cursor-row-resize select-none
          ${isSelected ? "bg-blue-400" : isEditing ? "bg-blue-300" : ""}
          `}
          onMouseDown={() => HandleTimeBlock(row, col, false)}
          onMouseEnter={(e) => {
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

    components.push(
      <div key={row} className="flex">
        <div className="flex justify-end items-center w-[60px] text-slate-600 select-none">
          {time}
        </div>
        <div className={`grid grid-cols-${date_length} w-full ml-2`}>
          {rowCells}
        </div>
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
  selectBlock: Set<string>,
  party: party_return_schema_type
) => {
  const blocks = Array.from(selectBlock);

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

export const PartyTimelineCard = ({
  className,
  party,
  votes,
}: PartyTimelineCardProps) => {
  const [timeLineComponent, setTimeLineComponent] = useState<ReactElement>();
  const [selectBlock, setSelectBlock] = useState<Set<string>>(new Set());
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState<boolean>(false);

  const HandleTimeBlock = useCallback(
    (row: number, col: number, isDragging: boolean) => {
      if (!isEditing) {
        toast.error("請先進入編輯模式");
        return;
      }

      const block_key = `${col}-${row}`;
      setSelectBlock((prev) => {
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
      HandleTimeBlock,
      selectBlock,
      isEditing
    );

    const container = (
      <div className={`grid grid-rows-${total_half_hours}`}>
        {header}
        {gridCells}
      </div>
    );

    setTimeLineComponent(container);
  }, [party, HandleTimeBlock, selectBlock]);

  const HandleCheckButton = async () => {
    if (!isEditing) {
      setIsEditing(true);
      toast.success("已進入編輯模式");
    } else if (selectBlock.size === 0) {
      toast.error("請選擇時間區塊！");
    } else {
      const timeslots = GenerateTimeSlots(selectBlock, party);
      const response = await CreateVote(timeslots, party.partyid);

      if(response.correct) {
        setIsEditing(false);
        setSelectBlock(new Set());
        toast.success("已成功送出投票");
      } else {
        toast.error(response.error);
      }
    }
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

  // debug: selectBlock
  useEffect(() => {
    console.log(selectBlock);
  }, [selectBlock]);

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
            setIsEditing={setIsEditing}
            setSelectBlock={setSelectBlock}
          />
          {timeLineComponent}
          {JSON.stringify(votes)}
        </CardContent>
      </Card>
    );
  }
};
