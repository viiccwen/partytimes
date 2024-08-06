"use client";
import { GetParty, UpdateParty } from "@/actions/party-actions";
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
import { party_edit_schema_type, party_return_schema_type } from "@/lib/type";
import { Edit2 } from "lucide-react";
import { useEffect, useState } from "react";
import { DeletePartyButton } from "../party/delete-party-button";
import { EditPartyButton } from "./edit-party-button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { party_edit_schema } from "@/lib/schema";
import { toast } from "sonner";

interface EditButtonProps {
  partyid: string;
  text?: string;
}

// todo: delete fetch the data, change to pass the data from parent

export const EditButton = ({ partyid, text }: EditButtonProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<party_edit_schema_type>({
    resolver: zodResolver(party_edit_schema),
  });
  const [party, setParty] = useState<party_return_schema_type | undefined>(
    undefined
  );

  useEffect(() => {
    const GetPartyInfo = async () => {
      const response = await GetParty(partyid);

      if (response.correct) {
        setParty(response.data.party);
      }
    };

    GetPartyInfo();
  }, [partyid]);

  const onSubmit = async (formdata: party_edit_schema_type) => {
    const response = await UpdateParty(formdata, partyid);

    if (response.correct) {
      window.location.reload();
    } else {
      toast.error(response.error);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Dialog>
            <DialogTrigger asChild>
              {text ? (
                <Button variant="outline" className="gap-2">
                  <Edit2 className="h-4 w-4" />
                  {text}
                </Button>
              ) : (
                <Button variant="outline" size="icon">
                  <Edit2 className="h-4 w-4" />
                </Button>
              )}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>編輯派對</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-5 mt-5">
                  <div className="flex flex-col gap-5">
                    <p className="font-bold text-xl">派對名稱</p>
                    <Input
                      defaultValue={party?.title ? party?.title : ""}
                      {...register("title")}
                    />
                    {errors.title && (
                      <p className=" text-red-500 text-sm">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-5">
                    <p className="font-bold text-xl">派對簡介</p>
                    <Textarea
                      defaultValue={party?.description ? party.description : ""}
                      {...register("description")}
                    />
                    {errors.description && (
                      <p className=" text-red-500 text-sm">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-full flex gap-4 mt-5">
                  <DeletePartyButton
                    partyid={partyid}
                    classname="w-full"
                    label="刪除派對"
                  />
                  <EditPartyButton classname="w-full" label="確認" />
                </div>
              </form>
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
