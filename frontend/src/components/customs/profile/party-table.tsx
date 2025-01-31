"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { party_return_schema_type } from "@/lib/type";
import { Clock, Text } from "lucide-react";
import { create } from "zustand";
import Link from "next/link";

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
    const [year, month, day] = date.split("-");
    return `${year}/${month}/${day}`;
  };

  const formatTime = (timeslot: time_type): string => {
    const formatHour = (hour: number) =>
      (hour < 1 ? hour + 12 : hour).toString().replace(".5", ":30");
    return `${formatHour(timeslot.start_time)} ${
      timeslot.start_ampm
    } ~ ${formatHour(timeslot.end_time)} ${timeslot.end_ampm}`;
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
            <button className="flex w-full min-h-[150px] gap-5 border-2 rounded-lg p-5 my-5 transition duration-300 ease-in-out shadow-md hover:bg-slate-100 dark:hover:bg-slate-800">
              <div className="flex gap-5 h-full">
                <div className="flex gap-3 items-center text-sm min-w-[90px] md:text-base">
                  {content.status && content.decision
                    ? formatDate(content.decision.date)
                    : "未計畫"}
                </div>
                <div className="flex flex-col items-start gap-3">
                  <div className="text-sm text-start md:text-lg mb-3 font-bold md:hidden">
                    {content.title.length > 15
                      ? content.title.substring(0, 15) + "..."
                      : content.title}
                  </div>
                  <div className="text-sm md:text-lg mb-3 font-bold hidden md:block">
                    {content.title}
                  </div>

                  <div className="text-xs md:text-base flex gap-2 md:hidden">
                    {content.description ? (
                      <div className="flex gap-3">
                        <Text className="mt-[1px]" size={12} />
                        <p className="text-start">
                          {content.description.length > 16
                            ? content.description.substring(0, 16) + "..."
                            : content.description}
                        </p>
                      </div>
                    ) : (
                      <div className="h-[16px]" />
                    )}
                  </div>
                  <div className="text-xs md:text-base hidden gap-2 md:flex">
                    {content.description ? (
                      <div className="flex gap-3">
                        <Text className="mt-[3px]" size={16} />
                        <p className="text-start">{content.description}</p>
                      </div>
                    ) : (
                      <div className="h-[16px]" />
                    )}
                  </div>
                  <div className="text-xs md:text-base flex items-center gap-2">
                    <Clock size={16} />
                    {content.status && content.decision
                      ? formatTime(content.decision)
                      : formatTime({
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
