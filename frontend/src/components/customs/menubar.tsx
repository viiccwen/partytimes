"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import { Separator } from "../ui/separator";
import Link from "next/link";

const links = [
  {
    name: "創建",
    url: "/create",
    protected: true,
    only_guest: false,
  },
  {
    name: "個人主頁",
    url: "/profile",
    protected: true,
    only_guest: false,
  },
  {
    name: "註冊",
    url: "/login",
    protected: false,
    only_guest: true,
  },
  {
    name: "登入",
    url: "/login",
    protected: false,
    only_guest: true,
  },
  {
    name: "回饋",
    url: "/feedback",
    protected: false,
    only_guest: false,
  },
  {
    name: "關於",
    url: "/about",
    protected: false,
    only_guest: false,
  },
];

export const MenuBar = ({
  side,
  isLogin,
}: {
  side: "left" | "right" | "top" | "bottom";
  isLogin: boolean;
}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="text-white" />
      </SheetTrigger>
      <SheetContent side={side}>
        <div className="flex justify-center items-center">
          <Image
            src="/PartyTimes-logo.png"
            alt="logo"
            width={200}
            height={200}
            className="cursor-pointer dark:invert"
          />
        </div>
        <Separator className="my-10 h-1" />
        <div className="flex flex-col gap-10">
          {links.map(
            (ele) =>
              (ele.protected === isLogin ||
                ele.only_guest === !isLogin) && (
                <Link
                  key={ele.name}
                  href={ele.url}
                  className="text-lg hover:text-blue-500 transition-all duration-300"
                >
                  {ele.name}
                </Link>
              )
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
