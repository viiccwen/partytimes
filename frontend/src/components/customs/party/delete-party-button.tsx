"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { DeleteParty } from "@/actions/party-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { party_table_store } from "../profile/party-table";
import { Delay } from "@/lib/utils";

interface DeletePartyButtonProps {
  partyid: string;
  classname: string;
  label: string;
  isConfirming: boolean;
}
export const DeletePartyButton = ({
  partyid,
  classname,
  label,
  isConfirming,
}: DeletePartyButtonProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const { setOpen } = party_table_store();

  const HandleClick = async () => {
    setIsDeleting(true);
    toast.promise(DeleteParty(partyid), {
      loading: "刪除中...",
      success: () => {
        Delay(1, true).then(() => router.push("/profile"));
        return "刪除成功";
      },
      error: "刪除派對時發生錯誤",
      finally: () => {
        setOpen(false);
        setIsDeleting(false);
      },
    });
  };

  return (
    <Button
      className={classname}
      onClick={HandleClick}
      disabled={isDeleting || isConfirming}
    >
      {isDeleting ? "刪除中..." : label}
    </Button>
  );
};
