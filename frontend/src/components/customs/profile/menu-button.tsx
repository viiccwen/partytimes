"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { party_table_store } from "./party-table";

interface MenuButtonProps {
  partyid: string;
}

export const MenuButton = ({ partyid }: MenuButtonProps) => {
  const { setOpen } = party_table_store();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MenuIcon className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setOpen(true)}>編輯</DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/party/${partyid}`}>查看</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
