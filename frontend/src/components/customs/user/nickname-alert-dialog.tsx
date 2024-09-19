"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { FieldValues, useForm, UseFormRegister } from "react-hook-form";
import { z } from "zod";

interface NicknameAlertDialogProps {
  open: boolean;
  onSubmit: (formdata: any) => Promise<void>;
}

const nickname_schema = z.object({
  nickname: z.string().min(1, "暱稱不可為空").max(20, "暱稱過長"),
});

type nickname_schema_type = z.infer<typeof nickname_schema>;

export const NicknameAlertDialog = ({ open, onSubmit }: NicknameAlertDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<nickname_schema_type>({
    resolver: zodResolver(nickname_schema),
  });
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AlertDialogHeader>
            <AlertDialogTitle>歡迎加入！</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription asChild>
            <div className="flex flex-col gap-6">
              歡迎加入PartyTime這個軟體，請先設定你的暱稱
              <Input placeholder="輸入暱稱..." {...register("nickname")} />
              {errors.nickname && (
                <span className=" text-red-500">{errors.nickname.message}</span>
              )}
            </div>
          </AlertDialogDescription>
          <AlertDialogFooter>
            <Button type="submit" className="mt-5">送出</Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
