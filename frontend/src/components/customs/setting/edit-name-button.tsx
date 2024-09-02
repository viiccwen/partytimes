"use client";

import { EditName } from "@/actions/user-actions";
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

interface EditNameButtonProps {
    value: string;
}

export const EditNameButton = ({ value }: EditNameButtonProps) => {
  const [name, setName] = useState<string>(value);

    const handleClick = async () => {
        const response = await EditName(name);

        if(response.correct) {
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
          <DialogTitle>更改名稱</DialogTitle>
        </DialogHeader>
        <div>
          <Input placeholder="輸入新的名稱" value={name} onChange={(e) => setName(e.currentTarget.value)} />
        </div>
        <DialogFooter>
          <Button onClick={handleClick}>確認</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
