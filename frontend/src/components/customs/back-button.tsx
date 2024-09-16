"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { Undo2 } from "lucide-react";
import Link from "next/link";

interface BackButtonProps {
  url: string;
}

export const BackButton = ({ url }: BackButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" asChild>
            <Link href={url}>
              <Undo2 className="w-4 h-4" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className=" text-xs">返回</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
