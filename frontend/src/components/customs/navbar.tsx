"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { CheckAuth } from "../../actions/user-actions";
import { ModeToggle } from "./mode-toggle";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MenuBar } from "./menubar";

const Cookies = require("js-cookie");

const links = [
  {
    name: "創建",
    url: "/create",
    protected: true,
  },
  {
    name: "主頁",
    url: "/profile",
    protected: true,
  },
  {
    name: "註冊",
    url: "/register",
    protected: false,
  },
  {
    name: "登入",
    url: "/login",
    protected: false,
  },
];

interface NavbarProps {
  isLogin: boolean;
}

export const Navbar = ({ isLogin }: NavbarProps) => {
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="flex justify-between p-5">
        <div className="flex ml-3 md:hidden">
          <MenuBar side="left" isLogin={isLogin} />
        </div>
        <div className="flex justify-center md:ml-10">
          <Image
            src="/partytime-navbar-logo.png"
            alt="logo"
            width={130}
            height={130}
            className="cursor-pointer dark:invert"
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
        <div className="gap-14 md:mr-10 mr-3 flex">
          <div className="hidden md:flex">
            {links.map(
              (ele, index) =>
                ele.protected === isLogin && (
                  <button key={index} className="mr-10 hover:text-blue-500 transition duration-300 ease-in-out">
                    <Link href={ele.url}>{ele.name}</Link>
                  </button>
                )
            )}
          </div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
