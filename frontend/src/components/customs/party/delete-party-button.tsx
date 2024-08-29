"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { DeleteParty } from "@/actions/party-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeletePartyButtonProps {
  partyid: string;
  classname: string;
  label: string;
}
export const DeletePartyButton = ({
  partyid,
  classname,
  label,
}: DeletePartyButtonProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const HandleClick = async () => {
    setIsDeleting(true);
    try {
      const response = await DeleteParty(partyid);

      if (response.correct) {
        router.push("/profile");
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
    <Button className={classname} onClick={HandleClick} disabled={isDeleting}>
      {isDeleting ? "刪除中..." : label}
    </Button>
  );
};
