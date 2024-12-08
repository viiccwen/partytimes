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
import { name_schema } from "@/lib/schema";
import { name_schema_type } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface EditNameButtonProps {
  name: string;
}

export const EditNameButton = ({ name }: EditNameButtonProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<name_schema_type>({
    resolver: zodResolver(name_schema),
  });
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  // todo: change it into form action
  const onSubmit = async (formdata: name_schema_type) => {
    toast.promise(EditName(formdata.name), {
      loading: "更改中...",
      success: () => {
        setOpen(false);
        router.refresh();
        return "成功更改名稱！";
      },
      error: (res) => res,
      finally: () => setOpen(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)}>
        <Edit2 className="w-4 h-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>更改名稱</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <Input
              placeholder="輸入新的名稱"
              defaultValue={name}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-3">{errors.name.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">確認</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
