"use client";
import { Button } from "@/components/ui/button";
import { CircleArrowRight, CircleArrowLeft, CirclePlus } from "lucide-react";
import { CreatePartyCard } from "./create-party-card";
import { SelectPartyTimeTable } from "./select-partytime-table";
import { CreatePartyStore } from "@/stores/create-party-store";
import { party_create_schema_type } from "@/lib/type";

interface SelectTimeP1Props {
  HandleNextClick: () => void;
}

export const SelectTimeP1 = ({ HandleNextClick }: SelectTimeP1Props) => {
  return (
    <div className="mt-10 mx-10 md:mx-20">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold text-white">創建派對 🎉</p>
        <Button variant="outline" onClick={HandleNextClick}>
          下一步
          <CircleArrowRight className="w-4 h-4 ml-4" />
        </Button>
      </div>

      <div className="mt-7">
        <SelectPartyTimeTable />
      </div>
    </div>
  );
};

interface SelectTimeP2Props {
  register: any;
  control: any;
  errors: any;
  handleSubmit: any;
  onSubmit: (formdata: party_create_schema_type) => Promise<void>;
  isSubmitting: boolean;
}

export const SelectTimeP2 = ({
  register,
  control,
  errors,
  handleSubmit,
  onSubmit,
  isSubmitting,
}: SelectTimeP2Props) => {
  const { setPage } = CreatePartyStore((state) => state);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-10 mx-10 md:mx-20">
        <div className="flex justify-between items-center">
          <p className="text-lg md:text-2xl font-bold text-white">
            創建派對 🎉
          </p>
          <div className=" space-x-2">
            <Button variant="outline" onClick={() => setPage(1)}>
              <div className="flex flex-col md:flex-row items-center">
                <span className="hidden md:block">上一步</span>
                <CircleArrowLeft className="w-4 h-4 mt-2 md:mt-0 md:ml-4" />
                <span className="text-sm text-slate-500 md:hidden">上一步</span>
              </div>
            </Button>
            <Button variant="outline" type="submit" disabled={isSubmitting}>
              <div className="flex flex-col md:flex-row items-center">
                <span className="hidden md:block">
                  {isSubmitting ? "創建中..." : "創建"}
                </span>
                <CirclePlus className="w-4 h-4 mt-2 md:mt-0 md:ml-4" />
                <span className="text-sm text-slate-500 md:hidden">
                  {isSubmitting ? "創建中..." : "創建"}
                </span>
              </div>
            </Button>
          </div>
        </div>
        <div className="mt-7">
          <CreatePartyCard
            register={register}
            control={control}
            errors={errors}
          />
        </div>
      </div>
    </form>
  );
};
