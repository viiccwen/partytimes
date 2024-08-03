import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LogOut } from "lucide-react";
import { Logout } from "../../../actions/user-actions";

export const LogOutButton = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon">
            <LogOut className="h-4 w-4" onClick={Logout} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">登出</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
