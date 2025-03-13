"use client";

import { Button } from "@/components/ui/button";

interface EditPartyButtonProps {
  classname: string;
  label: string;
  isConfirming: boolean;
}

export const EditPartyButton = ({
  classname,
  label,
  isConfirming,
}: EditPartyButtonProps) => {
  return (
    <Button className={classname} type="submit" disabled={isConfirming}>
      {isConfirming ? "確認中..." : label}
    </Button>
  );
};
