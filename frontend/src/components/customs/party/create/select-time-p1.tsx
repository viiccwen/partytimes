'use client';
import { Button } from "@/components/ui/button";
import { CircleArrowRight } from "lucide-react";
import { SelectPartyTimeTable } from "./select-partytime-table";
import { Dispatch, SetStateAction } from "react";

interface SelectTimeP1Props {
  selectedDate: string[];
  setSelectedDate: Dispatch<SetStateAction<string[]>>;
  HandleNextClick: () => void;
}

export const SelectTimeP1 = ({
  selectedDate,
  setSelectedDate,
  HandleNextClick,
}: SelectTimeP1Props) => {
  return (
    <div className="mt-10 mx-10 md:mx-20">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold text-white">創建派對 🎉</p>
        <Button variant="outline" onClick={HandleNextClick}>
          下一步
          <CircleArrowRight className="w-4 h-4 ml-4" />
        </Button>
      </div>

      <div className="mt-7">
        <SelectPartyTimeTable
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </div>
  );
};
