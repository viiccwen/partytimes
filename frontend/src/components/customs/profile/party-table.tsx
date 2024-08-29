"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  party_return_schema_type,
} from "@/lib/type";
import { Clock, Text } from "lucide-react";
import { create } from "zustand";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

interface PartyTableProps {
  party: party_return_schema_type[];
}

type PartyTableStore = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const party_table_store = create<PartyTableStore>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open: open }),
}));

type time_type = {
  date?: string;
  start_time: number;
  start_ampm: "AM" | "PM";
  end_time: number;
  end_ampm: "AM" | "PM";
};

export const PartyTable = ({ party }: PartyTableProps) => {
  const formatDate = (date: string) => {
    const [year, month, day] = new Date(date).toISOString().split('T')[0].split('-');
    return `${year}/${month}/${day}`;
  };

  const formatTime = (timeslot: time_type): string => {
    const formatHour = (hour: number) => (hour < 1 ? hour + 12 : hour).toString().replace(".5", ":30");
    return `${formatHour(timeslot.start_time)} ${timeslot.start_ampm} ~ ${formatHour(timeslot.end_time)} ${timeslot.end_ampm}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Party 🎉</CardTitle>
        <CardDescription>都可以有Party...輸光...</CardDescription>
      </CardHeader>
      <CardContent>
        {party.map((content: party_return_schema_type, index: number) => (
          <Link href={`/party/${content.partyid}`} key={index}>
            <button className="flex w-full h-[150px] gap-5 border-2 rounded-lg p-5 my-5 hover:text-white hover:bg-blue-500 transition duration-500 ease-in-out">
              <div className="flex h-full">
                <div className="flex gap-3 items-center text-sm w-[90px] md:text-base">
                  {content.status ? formatDate(content.date[0]) : "未計畫"}
                </div>
                <Separator orientation="vertical" className="h-full mx-5 hidden md:block" />
                <div className="flex flex-col items-start gap-3">
                  <div className="text-sm md:text-lg mb-3 font-bold">{content.title}</div>
                  <div className="text-xs md:text-base flex items-center gap-2">
                    {content.description ? (
                      <>
                        <Text size={16} />
                        {content.description}
                      </>
                    ) : (
                      <div className="h-[16px]" />
                    )}
                  </div>
                  <div className="text-xs md:text-base flex items-center gap-2">
                    <Clock size={16} />
                    {content.status ? formatTime(content.decision) : formatTime({
                      start_time: content.start_time,
                      start_ampm: content.start_ampm,
                      end_time: content.end_time,
                      end_ampm: content.end_ampm,
                    })}
                  </div>
                </div>
              </div>
            </button>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};