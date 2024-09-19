"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AmPmSelect, TimeSelect } from "./time-select";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { party_create_schema_type } from "@/lib/type";

interface CreatePartyCardProps {
  register: UseFormRegister<party_create_schema_type>;
  control: Control<party_create_schema_type, any>;
  errors: FieldErrors<party_create_schema_type>;
}

export const CreatePartyCard = ({register, control, errors} : CreatePartyCardProps) => {
  return (
    <Card>
      <CardContent className="mt-7">
        <div className="space-y-4 my-8">
          <div className=" font-bold text-xl">派對名稱</div>
          <Input
            placeholder="輸入你的派對名稱"
            className="w-full md:w-[500px]"
            {...register("title")}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>
        <div className="space-y-4 my-8">
          <div className=" font-bold text-xl">派對簡介</div>
          <Textarea
            placeholder="敘述你的派對簡介 (Option)"
            className="w-full md:w-[500px] h-[80px]"
            {...register("description")}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
        <div className="space-y-4 my-8">
          <div className=" font-bold text-xl">選擇時段</div>
          <div className="flex flex-col md:flex-row gap-2 w-full">
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
            </div>
            <p className="text-sm mx-1 my-2 md:my-0 md:mt-2">至</p>
            <div className="flex gap-2 items-center">
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
        </div>
      </CardContent>
    </Card>
  );
};