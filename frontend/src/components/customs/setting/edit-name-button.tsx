"use client";

import { EditName } from "@/actions/user-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface EditNameButtonProps {
  value: string;
}

export const EditNameButton = ({ value }: EditNameButtonProps) => {
  const [name, setName] = useState<string>(value);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleClick = async () => {
    const response = await EditName(name);
    setOpen(false);

    if (response.correct) {
      toast.success("成功更改名稱！");
      router.refresh();
    } else {
      toast.error(response.error);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTrigger onClick={() => setOpen(true)}>
        <Edit2 className="w-4 h-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>更改名稱</DialogTitle>
        </DialogHeader>
        <div>
          <Input
            placeholder="輸入新的名稱"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleClick}>確認</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
