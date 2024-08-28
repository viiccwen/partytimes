"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import {
  Control,
  Controller,
  FieldValues,
} from "react-hook-form";

interface TimeSelectProps {
  defaultValue: string;
  registerName: string;
  control: Control<FieldValues, any>;
}

// todo: sharing the controller code on GitHub

export const TimeSelect = ({
  defaultValue,
  registerName,
  control
}: TimeSelectProps) => {
  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={registerName}
      render={({ field }) => (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger className="w-[70px]">
            <SelectValue placeholder={defaultValue} ref={field.ref} />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 12 }, (_, i) => i).map((hour) =>
              hour === 0 ? (
                <SelectItem key="12" value="12">
                  12
                </SelectItem>
              ) : (
                <SelectItem key={hour} value={hour.toString()}>
                  {hour}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      )}
    />
  );
};

interface AmPmSelectProps {
  defaultValue: string;
  registerName: string;
  control: Control<FieldValues, any>;
}

export const AmPmSelect = ({
  defaultValue,
  registerName,
  control,
}: AmPmSelectProps) => {
  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={registerName}
      render={({ field }) => (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger className="w-[70px]">
            <SelectValue placeholder={defaultValue} ref={field.ref} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="AM">am</SelectItem>
              <SelectItem value="PM">pm</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
};
