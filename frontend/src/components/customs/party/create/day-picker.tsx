"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { CreatePartyStore } from "@/stores/create-party-store";

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (month: number, year: number) => {
  return new Date(year, month, 1).getDay();
};

const CheckValidDate = ({
  day,
  currentDate,
}: {
  day: number;
  currentDate: Date;
}) => {
  const today = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  return (
    currentYear < today.getFullYear() ||
    (currentYear === today.getFullYear() && currentMonth < today.getMonth()) ||
    (currentYear === today.getFullYear() &&
      currentMonth === today.getMonth() &&
      day < today.getDate())
  );
};

export const DayPicker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { selectedDate, setSelectedDate } = CreatePartyStore((state) => state);

  const daysArray = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = getFirstDayOfMonth(month, year);
    const daysInMonth = getDaysInMonth(month, year);

    return Array(firstDay)
      .fill(null)
      .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));
  }, [currentDate]);

  const formatDate = (year: number, month: number, day: number): string => {
    const formattedMonth = month.toString().padStart(2, "0");
    const formattedDay = day.toString().padStart(2, "0");
    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  const HandleClick = useCallback(
    (value: string) => {
      if (selectedDate?.length === 7 && !selectedDate.includes(value)) {
        toast.error("最多選擇 7 天!");
        return;
      }

      let updatedSelectedDate: string[];

      if (selectedDate.includes(value))
        updatedSelectedDate = selectedDate.filter((date) => date !== value);
      else updatedSelectedDate = [...selectedDate, value];

      setSelectedDate(updatedSelectedDate);
    },
    [selectedDate, currentDate]
  );

  const handleMonthChange = (offset: number) => {
    setCurrentDate(
      (prevDate) =>
        new Date(prevDate.getFullYear(), prevDate.getMonth() + offset, 1)
    );
  };

  return (
    <div className="w-full">
      <div className="flex justify-around items-center mb-10">
        {currentDate.getFullYear() > new Date().getFullYear() ||
        (currentDate.getFullYear() == new Date().getFullYear() &&
          currentDate.getMonth() > new Date().getMonth()) ? (
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleMonthChange(-1)}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        ) : (
          <div className="w-5 h-5 mr-5"></div>
        )}

        <div className="font-bold">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleMonthChange(1)}
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 text-center my-3">
        {days.map((day, index) => (
          <div key={`day-${index}`} className="text-xs md:text-sm">
            {day}
          </div>
        ))}
      </div>
      <Separator className="w-full my-3" />

      <div className="grid grid-cols-7">
        {daysArray.map((day, index) =>
          day ? (
            <div key={`days-${index}`} className="flex justify-center">
              <Button
                key={`day-${index}-button`}
                variant="outline"
                className={`bg-inherit border-none text-slate-700 text-sm rounded-full w-[30px] h-[30px] md:w-[40px] md:h-[40px] m-3 place-content-center ${
                  selectedDate?.includes(
                    formatDate(
                      currentDate.getFullYear(),
                      currentDate.getMonth() + 1,
                      day
                    )
                  )
                    ? "bg-orange-400 text-white hover:bg-orange-500 hover:text-white"
                    : "hover:bg-orange-300 hover:text-white dark:text-white"
                }`}
                disabled={CheckValidDate({
                  day,
                  currentDate,
                })}
                value={formatDate(
                  currentDate.getFullYear(),
                  currentDate.getMonth() + 1,
                  day
                )}
                onClick={(e) => HandleClick(e.currentTarget.value)}
              >
                {day}
              </Button>
            </div>
          ) : (
            <div
              key={`days-hidden-${index}`}
              className="w-[40px] h-[40px]"
            ></div>
          )
        )}
      </div>
    </div>
  );
};
