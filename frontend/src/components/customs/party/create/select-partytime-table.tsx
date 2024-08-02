"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DayPicker } from "./day-picker";

export const SelectPartyTimeTable = () => {
  return (
    <Card>
      <CardContent className="mt-7">
        <DayPicker />
      </CardContent>
    </Card>
  );
};
