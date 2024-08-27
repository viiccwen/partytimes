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

type PageState = {
  page: number;
  FirstPage: () => void;
  SecondPage: () => void;
};

const usePageStore = create<PageState>((set) => ({
  page: 1,
  FirstPage: () => set({ page: 1 }),
  SecondPage: () => set({ page: 2 }),
}));

export const SelectPartyTimePanel = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string[]>([]);
  const { page, FirstPage, SecondPage } = usePageStore();

  // todo: add types and zodresolver
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const HandleNextClick = () => {
    if (selectedDate.length === 0) {
      toast.error("請選擇日期!");
      return;
    }
    SecondPage();
  };

  const HandlePrevClick = () => {
    FirstPage();
  };

  const onSubmit = async (formdata: any) => {
    formdata.date = selectedDate;
    formdata.start_time = Number(formdata.start_time);
    formdata.end_time = Number(formdata.end_time);

    const resposne = await CreateParty(formdata);

    if (resposne.correct) {
      router.push(`/party/${resposne.data.partyid}`);
    } else {
      toast.error(resposne.error);
    }
  };

  if (page === 1) {
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
        <div className="mt-10 mx-20">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold">創建派對 🎉</p>
            <div className=" space-x-2">
              <Button variant="outline" onClick={HandlePrevClick}>
                上一步
                <CircleArrowLeft className="w-4 h-4 ml-4" />
              </Button>
              <Button variant="outline" type="submit">
                創建
                <CirclePlus className="w-4 h-4 ml-4" />
              </Button>
            </div>
          </div>
          <div className="mt-7">
            <CreatePartyCard register={register} control={control} />
          </div>
        </div>
      </form>
    );
  }
};
