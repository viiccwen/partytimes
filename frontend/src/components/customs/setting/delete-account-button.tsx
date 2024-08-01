'use client';

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
import { DeleteAccount } from "../../../../actions/auth-actions";
import { toast } from "sonner";

export const DeleteAccountButton = () => {

    const handleDeleteAccount = async () => {
        const response = await DeleteAccount();

        if (response.correct) {
            window.location.href = "/";
        } else {
            toast.error(response.error);
        }
    }

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
