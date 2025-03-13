"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AmPmSelect, TimeSelect } from "./time-select";

import { party_create_schema } from "@/lib/schema";
import { party_create_schema_type } from "@/lib/type";

import { CreateParty } from "@/actions/party-actions";
import { useCreatePartyStore } from "@/stores/create-party-store";
import { ConvertTo24Hours, Delay } from "@/lib/utils";

interface CreatePartyFormProps {
  className?: string;
}

export const CreatePartyForm = ({ className }: CreatePartyFormProps) => {
  const router = useRouter();
  const { selectedDate, setSelectedDate, isLoading, setIsLoading } =
    useCreatePartyStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<party_create_schema_type>({
    resolver: zodResolver(party_create_schema),
  });

  const onSubmit = async (formdata: party_create_schema_type) => {
    const start_time = Number(formdata.start_time);
    const end_time = Number(formdata.end_time);

    const tw_start_time = ConvertTo24Hours(
      start_time,
      formdata.start_ampm,
      true,
    );
    const tw_end_time = ConvertTo24Hours(end_time, formdata.end_ampm, false);

    if (tw_start_time >= tw_end_time) {
      toast.error("開始時間不能大於或等於結束時間！");
      return;
    }
    if (selectedDate.length === 0) {
      toast.error("請選擇日期！");
      return;
    }

    setIsLoading(true);

    selectedDate.sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA.getTime() - dateB.getTime();
    });

    toast.promise(CreateParty({ ...formdata, date: selectedDate }), {
      loading: "創建中...",
      success: (res) => {
        Delay(1, true).then(() => {
          setSelectedDate([]);
          setIsLoading(false);
          router.push(`/party/${res.data?.partyid}`);
        });
        return "創建成功！";
      },
      error: (res) => res.error,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-fit">
      <div className={className}>
        <div className="space-y-2">
          <div className=" font-bold text-xl">派對名稱</div>
          <Input
            placeholder="輸入你的派對名稱"
            className="min-w-fit"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <div className=" font-bold text-xl">派對簡介</div>
          <Textarea
            placeholder="敘述你的派對簡介 (Option)"
            className="w-full h-[80px]"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>
        <div className="space-y-4">
          <div className=" font-bold text-xl">選擇時段</div>
          <div className="flex flex-row gap-2 w-full">
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

        <Button
          className="mb-3 bg-blue-500 hover:bg-blue-600 text-white"
          disabled={isLoading}
        >
          {isLoading ? "創建中..." : "創建"}
        </Button>
      </div>
    </form>
  );
};
