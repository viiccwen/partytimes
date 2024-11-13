import { CreatePartyForm } from "./create-party-form";
import { Card } from "@/components/ui/card";
import { DayPicker } from "./day-picker";

export const CreatePartyCard = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-5 mb-10 gap-5">
        <p className="text-2xl font-bold">創建派對 🎉</p>
        <Card className="flex flex-wrap flex-grow h-auto p-5 gap-[30px]">
          <DayPicker className="w-full md:w-fit" />
          <CreatePartyForm className="flex flex-col justify-between gap-5 h-full" />
        </Card>
      </div>
    </>
  );
};
