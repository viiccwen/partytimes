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
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded gap-2"
      onClick={handleClick}
    >
      <Share2 className="w-4 h-4" />
      <p>分享</p>
    </Button>
  );
};