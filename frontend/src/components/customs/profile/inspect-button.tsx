import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye } from "lucide-react";
import Link from "next/link";

interface InspectButtonProps {
  partyid: string;
}

export const InspectButton = ({ partyid }: InspectButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" asChild>
            <Link href={`/party/${partyid}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">查看</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
