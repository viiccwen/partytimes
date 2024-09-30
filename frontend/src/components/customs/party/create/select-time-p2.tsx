'use client';

import { Button } from "@/components/ui/button";
import { CircleArrowLeft, CirclePlus } from "lucide-react";
import { CreatePartyCard } from "./create-party-card";

interface SelectTimeP2Props {
    HandlePrevClick: () => void;
    register: any;
    control: any;
    errors: any;
    handleSubmit: any;
    onSubmit: any;
}

export const SelectTimeP2 = ({
    HandlePrevClick,
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
}: SelectTimeP2Props) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-10 mx-10 md:mx-20">
        <div className="flex justify-between items-center">
          <p className="text-lg md:text-2xl font-bold text-white">
            創建派對 🎉
          </p>
          <div className=" space-x-2">
            <Button variant="outline" onClick={HandlePrevClick}>
              <div className="flex flex-col md:flex-row items-center">
                <span className="hidden md:block">上一步</span>
                <CircleArrowLeft className="w-4 h-4 mt-2 md:mt-0 md:ml-4" />
                <span className="text-sm text-slate-500 md:hidden">上一步</span>
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
