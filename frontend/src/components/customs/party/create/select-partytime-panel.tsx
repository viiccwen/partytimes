"use client";
import { Button } from "@/components/ui/button";
import { CircleArrowRight } from "lucide-react";
import { SelectPartyTimeTable } from "./select-partytime-table";
import { useState } from "react";
import { toast } from "sonner";

export const SelectPartyTimePanel = () => {
    const [selectedDate, setSelectedDate] = useState<string[]>([]);

    const HandleNextClick = () => {
        if(selectedDate.length === 0) {
            toast.error("請選擇日期!");
        }
    }

  return (
    <div className="mt-10 mx-20">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold">創建派對 🎉</p>
        <Button variant="outline" onClick={HandleNextClick}>
          下一步
          <CircleArrowRight className="w-4 h-4 ml-4" />
        </Button>
      </div>

      <div className="mt-7">
        <SelectPartyTimeTable />
      </div>
    </div>
  );
};
