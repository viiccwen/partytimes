import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit2 } from "lucide-react";

interface EditButtonProps {
  partyid: string;
}

export const EditButton = ({ partyid }: EditButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon">
            <Edit2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">編輯</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
