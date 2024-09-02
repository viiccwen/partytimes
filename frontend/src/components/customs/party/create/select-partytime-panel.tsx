"use client";
import { Button } from "@/components/ui/button";
import { CircleArrowLeft, CircleArrowRight, CirclePlus } from "lucide-react";
import { SelectPartyTimeTable } from "./select-partytime-table";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CreatePartyCard } from "./create-party-card";

import { create } from "zustand";
import { useForm } from "react-hook-form";

import { CreateParty } from "@/actions/party-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { party_create_schema } from "@/lib/schema";
import { party_create_schema_type } from "@/lib/type";

export const SelectPartyTimePanel = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<party_create_schema_type>({
    resolver: zodResolver(party_create_schema),
  });

  const HandleNextClick = () => {
    if (selectedDate.length === 0) {
      toast.error("請選擇日期!");
      return;
    }
    setPage(2);
  };

  const HandlePrevClick = () => {
    setPage(1);
  };

  const onSubmit = async (formdata: any) => {
    formdata.date = selectedDate;
    formdata.start_time = Number(formdata.start_time);
    formdata.end_time = Number(formdata.end_time);

    const resposne = await CreateParty(formdata);

    if (resposne.correct) {
      router.push(`/party/${resposne.data?.partyid}`);
    } else {
      toast.error(resposne.error);
    }
  };

  if (page === 1) {
    return (
      <div className="mt-10 mx-10 md:mx-20">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold">創建派對 🎉</p>
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
  } else if (page === 2) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-10 mx-10 md:mx-20">
          <div className="flex justify-between items-center">
            <p className="text-lg md:text-2xl font-bold">創建派對 🎉</p>
            <div className=" space-x-2">
              <Button variant="outline" onClick={HandlePrevClick}>
                <div className="flex flex-col md:flex-row items-center">
                  <span className="hidden md:block">上一步</span>
                  <CircleArrowLeft className="w-4 h-4 mt-2 md:mt-0 md:ml-4" />
                  <span className="text-sm text-slate-500 md:hidden">
                    上一步
                  </span>
                </div>
              </Button>
              <Button variant="outline" type="submit">
                <div className="flex flex-col md:flex-row items-center">
                  <span className="hidden md:block">創建</span>
                  <CirclePlus className="w-4 h-4 mt-2 md:mt-0 md:ml-4" />
                  <span className="text-sm text-slate-500 md:hidden">創建</span>
                </div>
              </Button>
            </div>
          </div>
          <div className="mt-7">
            <CreatePartyCard register={register} control={control} errors={errors} />
          </div>
        </div>
      </form>
    );
  }
};
