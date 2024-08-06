'use client';

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { DeleteParty } from "@/actions/party-actions";

interface DeletePartyButtonProps {
  partyid: string;
  classname: string;
  label: string;
}

export const DeletePartyButton = ({ partyid, classname, label }: DeletePartyButtonProps) => {

    const HandleClick = async () => {
        const response = await DeleteParty(partyid);

        if(response.correct) {
            // todo: add toast after reloading
            window.location.reload();
        } else {
            toast.error(response.error);
        }
    }
  
    return (
    <Button className={classname} onClick={HandleClick}>
      {label}
    </Button>
  );
};
