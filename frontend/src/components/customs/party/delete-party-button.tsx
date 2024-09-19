"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { DeleteParty } from "@/actions/party-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { party_table_store } from "../profile/party-table";

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
  isConfirming
}: DeletePartyButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { setOpen } = party_table_store();

  const HandleClick = async () => {
    setIsDeleting(true);
    try {
      const response = await DeleteParty(partyid);

      if (response.correct) {
        setOpen(false);
        window.location.replace("/profile");
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error("刪除派對時發生錯誤");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button className={classname} onClick={HandleClick} disabled={isDeleting || isConfirming}>
      {isDeleting ? "刪除中..." : label}
    </Button>
  );
};
