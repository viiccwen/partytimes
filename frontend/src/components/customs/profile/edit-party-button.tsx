"use client";

import { Button } from "@/components/ui/button";

interface EditPartyButtonProps {
    classname: string;
    label: string;
}

export const EditPartyButton = ({classname, label} : EditPartyButtonProps) => {  
    return (
    <Button className={classname} type="submit">
      {label}
    </Button>
  );
};
