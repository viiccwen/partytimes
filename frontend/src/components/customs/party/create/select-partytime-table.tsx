"use client";
import { Card, CardContent } from "@/components/ui/card";
import { DayPicker } from "./day-picker";
import { Dispatch, SetStateAction } from "react";

interface SelectPartyTimeTableProps {
  selectedDate: string[];
  setSelectedDate: Dispatch<SetStateAction<string[]>>;
}

export const SelectPartyTimeTable = ({
  selectedDate,
  setSelectedDate,
}: SelectPartyTimeTableProps) => {
  return (
    <Card>
      <CardContent className="mt-7">
        <DayPicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </CardContent>
    </Card>
  );
};
