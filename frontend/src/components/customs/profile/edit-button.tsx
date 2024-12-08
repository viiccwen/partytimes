"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { party_edit_schema_type } from "@/lib/type";
import { EditPartyButton } from "./edit-party-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { party_edit_schema } from "@/lib/schema";
import { UpdateParty } from "@/actions/party-actions";

import { party_table_store } from "./party-table";
import { Delay } from "@/lib/utils";
import { DeletePartyButton } from "../party/delete-party-button";


interface EditButtonProps {
  partyid: string;
  partyTitle: string;
  partyDescription: string;
  text?: string;
}

export const EditButton = ({
  partyid,
  partyTitle,
  partyDescription,
  text,
}: EditButtonProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<party_edit_schema_type>({
    resolver: zodResolver(party_edit_schema),
  });
  const { open, setOpen } = party_table_store();
  const [isConfirming, setIsConfirming] = useState<boolean>(false);

  const onSubmit = async (formdata: party_edit_schema_type) => {
    setIsConfirming(true);
    toast.promise(UpdateParty(formdata, partyid), {
      loading: "更新中...",
      success: () => {
        Delay(1, true).then(() => {
          setOpen(false);
          router.refresh()});
        return "更新成功";
      },
      error: (res) => res.error,
      finally: () => setIsConfirming(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {text ? (
          <Button variant="outline" className="gap-2">
            <Edit2 className="h-4 w-4" />
            <p className="hidden md:block">{text}</p>
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
              <Input defaultValue={partyTitle} {...register("title")} />
              {errors.title && (
                <p className=" text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-5">
              <p className="font-bold text-xl">派對簡介</p>
              <Textarea
                defaultValue={partyDescription}
                {...register("description")}
              />
              {errors.description && (
                <p className=" text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="w-full flex flex-row-reverse gap-4 mt-5">
            <EditPartyButton classname="w-full text-white bg-blue-500 hover:bg-blue-600" label="確認" isConfirming={isConfirming} />
            <DeletePartyButton
              partyid={partyid}
              className="w-full bg-inherit text-red-500 border border-red-500 hover:bg-red-500 hover:text-white"
              label="刪除派對"
              isConfirming={isConfirming}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
