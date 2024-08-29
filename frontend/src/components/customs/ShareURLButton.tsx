"use client";
import { Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

export const ShareURLButton = () => {
  const handleClick = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("已成功複製連結，快去分享給朋友吧！");
  };

  return (
    <Button
      variant="outline"
      className="font-bold py-2 px-4 rounded gap-2"
      onClick={handleClick}
    >
      <Share2 className="w-4 h-4" />
      <p className="hidden md:block">分享</p>
    </Button>
  );
};
