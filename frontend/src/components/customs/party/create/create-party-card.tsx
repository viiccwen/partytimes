"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AmPmSelect, TimeSelect } from "./time-select";
import { Control, FieldValues, UseFormRegister } from "react-hook-form";

interface CreatePartyCardProps {
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues, any>;
}

export const CreatePartyCard = ({register, control} : CreatePartyCardProps) => {
  return (
    <Card>
      <CardContent className="mt-7">
        <div className="space-y-4 my-8">
          <div className=" font-bold text-xl">派對名稱</div>
          <Input
            placeholder="輸入你的派對名稱"
            className="w-[500px]"
            {...register("title")}
          />
        </div>
        <div className="space-y-4 my-8">
          <div className=" font-bold text-xl">派對簡介</div>
          <Textarea
            placeholder="敘述你的派對簡介 (Option)"
            className="w-[500px] h-[80px]"
            {...register("description")}
          />
        </div>
        <div className="space-y-4 my-8">
          <div className=" font-bold text-xl">選擇時段</div>
          <div className="flex gap-2 items-center">
            <TimeSelect
              defaultValue="8"
              registerName="start_time"
              control={control}
            />
            <AmPmSelect
              defaultValue="AM"
              registerName="start_ampm"
              control={control}
              />
            <p className="text-sm mx-5">至</p>
            <TimeSelect
              defaultValue="6"
              registerName="end_time"
              control={control}
            />
            <AmPmSelect
              defaultValue="PM"
              registerName="end_ampm"
              control={control}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};