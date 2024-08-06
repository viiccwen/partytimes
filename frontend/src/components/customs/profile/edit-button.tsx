"use client";
import { GetParty } from "@/actions/party-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { party_return_schema_type } from "@/lib/type";
import { Edit2 } from "lucide-react";
import { useEffect, useState } from "react";
import { DeletePartyButton } from "../party/delete-party-button";

interface EditButtonProps {
  partyid: string;
}

const edit_element = [
  {
    title: "派對名稱",
    input: <Input />,
  },
  {
    title: "派對簡介",
    input: <Textarea />,
  },
];

export const EditButton = ({ partyid }: EditButtonProps) => {
  const [party, setParty] = useState<party_return_schema_type | undefined>(undefined);

  useEffect(() => {
    const GetPartyInfo = async () => {
      const response = await GetParty(partyid);

      if (response.correct) {
        setParty(response.data.party);
      }
    };

    GetPartyInfo();
  }, [partyid]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Edit2 className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>編輯派對</DialogTitle>
              </DialogHeader>

              <div className="flex flex-col gap-5 mt-5">
                <div className="flex flex-col gap-5">
                  <p className="font-bold text-xl">派對名稱</p>
                  <Input defaultValue={party?.title ? party?.title : ""} />
                </div>
                <div className="flex flex-col gap-5">
                  <p className="font-bold text-xl">派對簡介</p>
                  <Textarea defaultValue={party?.description ? party.description : ""} />
                </div>
              </div>

              <div className="w-full flex gap-4">
                <DeletePartyButton partyid={partyid} classname="w-full" label="刪除派對" />
                <Button variant="default" className="w-full">
                  儲存
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">編輯</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
