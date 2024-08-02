"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const today = new Date().getDate();
console.log(today);

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
  const [daysArray, setDaysArray] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState<string[] | null>(null);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = getFirstDayOfMonth(month, year);
    const daysInMonth = getDaysInMonth(month, year);

    const daysArray = Array(firstDay)
      .fill(null)
      .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

    setDaysArray(daysArray);
  }, [currentDate]);

  const HandleClick = (value: string) => {
    // limit up to 7 days
    if (selectedDate?.length === 7 && !selectedDate.includes(value)) {
      toast.error("最多選擇 7 天!");
      return;
    }

    setSelectedDate((prev) => {
      if (prev === null) {
        return [value];
      } else {
        if (prev.includes(value)) {
          return prev.filter((date) => date !== value);
        } else {
          return [...prev, value];
        }
      }
    });
  };

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  return (
    <div className="w-full">
      <div className="flex justify-around items-center mb-10">
        {currentDate.getFullYear() > new Date().getFullYear() ||
        (currentDate.getFullYear() == new Date().getFullYear() &&
          currentDate.getMonth() > new Date().getMonth()) ? (
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.setMonth(currentDate.getMonth() - 1))
              )
            }
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        ) : (
          <div className="w-5 h-5 mr-5"></div>
        )}

        <div className=" font-bold">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.setMonth(currentDate.getMonth() + 1))
            )
          }
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 text-center my-3">
        {days.map((day, index) => (
          <div key={index} className="text-sm">
            {day}
          </div>
        ))}
      </div>
      <Separator className="w-full my-3" />

      <div className="grid grid-cols-7">
        {/* daypicker */}
        {daysArray.map((day, index) =>
          day ? (
            <div className="flex justify-center">
              <Button
            //   bug: warning
                key={`${index}`}
                variant="outline"
                className={`bg-inherit border-none text-slate-700 text-sm rounded-full w-[40px] h-[40px] m-3 place-content-center ${
                  selectedDate?.includes(
                    `${currentDate.getFullYear()}-${
                      currentDate.getMonth() + 1
                    }-${day}`
                  )
                    ? "bg-orange-400 text-white hover:bg-orange-500 hover:text-white "
                    : "hover:bg-orange-300 hover:text-white"
                }`}
                disabled={CheckValidDate({
                  day,
                  currentDate,
                })}
                value={`${currentDate.getFullYear()}-${
                  currentDate.getMonth() + 1
                }-${day}`}
                onClick={(e) => HandleClick(e.currentTarget.value)}
              >
                {day}
              </Button>
            </div>
          ) : (
            <div className="w-[40px] h-[40px]"></div>
          )
        )}
      </div>
    </div>
  );
};
