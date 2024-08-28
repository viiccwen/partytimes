"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Undo2 } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { general_fetch_return_type, guest_schema_type } from "@/lib/type";
import { guest_schema } from "@/lib/schema";
import { useGuestVoteStore } from "@/stores/guest-vote-store";
import { CreateVote } from "@/actions/vote-actions";
import { toast } from "sonner";

interface guest_dialog_props {
  partyid: string;
}

export const GuestDialog = ({ partyid }: guest_dialog_props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<guest_schema_type>({
    resolver: zodResolver(guest_schema),
  });

  const timeslots = useGuestVoteStore((state) => state.timeslots);
  const Open = useGuestVoteStore((state) => state.open);
  const setOpen = useGuestVoteStore((state) => state.setOpen);
  const guestId = useGuestVoteStore((state) => state.guestId);

  // todo: submit form
  const onSubmit = async (formdata: any) => {
    const { nickname, email } = formdata;

    // todo: lack of guestid
    const res: general_fetch_return_type = await CreateVote(
      timeslots,
      nickname,
      partyid
    );

    if(res.correct) {
      setOpen(false);
    } else {
        toast.error(res.error);
    }
  };

  return (
    <AlertDialog open={Open}>
      <AlertDialogTrigger hidden></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between items-center text-xl">
            以訪客身分登記
            <AlertDialogCancel onClick={() => setOpen(false)}>
              <Undo2 className="w-4 h-4 mr-2" />
              <span>返回</span>
            </AlertDialogCancel>
          </AlertDialogTitle>
          <AlertDialogDescription>
            你目前沒有登入，是否要以訪客身分登記？
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="w-[250px] text-lg">暱稱</span>
              <Input {...register("nickname")} />
            </div>
            {errors.nickname && (
              <span className="text-red-500">{errors.nickname.message}</span>
            )}
            <div className="flex items-center mt-5">
              <span className="w-[250px] text-lg">email (optional)</span>
              <Input type="email" {...register("email")} />
            </div>
            <div className="flex justify-between mt-8">
              <Button variant="link" asChild>
                <Link href="/login">現在馬上登入！</Link>
              </Button>
              <Button type="submit">確認</Button>
            </div>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
