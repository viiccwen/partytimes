"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GetUserInfo } from "../../../../actions/auth-actions";
import { toast } from "sonner";

const Cookie = require("js-cookie");

export const SettingButton = () => {
  const router = useRouter();

  const handleSettingButton = async () => {
    if (
      Cookie.get("token") &&
      Cookie.get("id") &&
      Cookie.get("name") &&
      Cookie.get("email")
    ) {
      router.push("/setting");
    } else {
      const response = await GetUserInfo();

      if (response.correct) {
        router.push("/setting");
      } else {
        toast.error(response.error);
      }
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" onClick={handleSettingButton}>
            <Settings className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">設定</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
