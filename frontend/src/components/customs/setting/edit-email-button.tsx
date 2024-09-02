"use client";

import { EditEmail } from "@/actions/user-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface EditEmailButtonProps {
    value: string;
}

export const EditEmailButton = ({ value }: EditEmailButtonProps) => {
  const [email, setEmail] = useState<string>(value);

  const handleClick = async () => {
    const response = await EditEmail(email);
    
    if(response.correct) {
        // todo: add a success toast
        window.location.reload();
    } else {
      toast.error(response.error);
    }
}

  return (
    <Dialog>
      <DialogTrigger>
        <Edit2 className="w-4 h-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>更改Email</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <Input placeholder="輸入新的Email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        </div>
        <DialogFooter>
          <Button onClick={handleClick}>確認</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
