"use client";

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
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { DeleteAccount } from "../../../actions/user-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Delay } from "@/lib/utils";

export const DeleteAccountButton = () => {
  const router = useRouter();
  const handleDeleteAccount = async () => {
    toast.promise(DeleteAccount, {
      loading: "刪除中...",
      success: () => {
        Delay(1, true).then(() => router.push("/"));
        return "刪除成功！";
      },
      error: (res) => res.error,
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-5 text-red-500 hover:text-white hover:bg-red-500"
        >
          <Trash2 className="w-4 h-4" />
          <p>刪除帳號</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>你確定嗎？</AlertDialogTitle>
          <AlertDialogDescription>
            此動作無法復原，將會刪除你的帳號以及所有活動和投票回應。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction
            className="bg-slate-100 text-red-500 hover:text-white hover:bg-red-500"
            onClick={handleDeleteAccount}
          >
            刪除
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
