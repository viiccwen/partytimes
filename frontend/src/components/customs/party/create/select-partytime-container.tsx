"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SelectTimeP1, SelectTimeP2 } from "./select-page";

import { party_create_schema } from "@/lib/schema";
import { party_create_schema_type } from "@/lib/type";
import { ConverTo24Hours } from "../inspect/timeline/party-timeline-helper";
import { CreateParty } from "@/actions/party-actions";
import { CreatePartyStore } from "@/stores/create-party-store";

export const SelectPartyTimeContainer = () => {
  const router = useRouter();
  const { page, selectedDate, setPage } = CreatePartyStore((state) => state);

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

  const onSubmit = async (formdata: party_create_schema_type) => {
    const start_time = Number(formdata.start_time);
    const end_time = Number(formdata.end_time);

    const tw_start_time = ConverTo24Hours(
      start_time,
      formdata.start_ampm,
      true
    );
    const tw_end_time = ConverTo24Hours(end_time, formdata.end_ampm, false);

    if (tw_start_time >= tw_end_time) {
      toast.error("開始時間不能大於或等於結束時間!");
      return;
    }

    selectedDate.sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA.getTime() - dateB.getTime();
    });

    const resposne = await CreateParty({ ...formdata, date: selectedDate });

    if (resposne.correct) router.push(`/party/${resposne.data?.partyid}`);
    else toast.error(resposne.error);
  };

  if (page === 1) {
    return <SelectTimeP1 HandleNextClick={HandleNextClick} />;
  } else if (page === 2) {
    return (
      <SelectTimeP2
        register={register}
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      />
    );
  }
};
