"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { CheckAuth } from "../../actions/user-actions";
import { ModeToggle } from "./mode-toggle";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MenuBar } from "./menubar";

const Cookies = require("js-cookie");

// link
const links = [
  {
    name: "創建",
    url: "/create",
    protected: true,
  },
  {
    name: "個人主頁",
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

export const Navbar = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const islogin = async (token: any) => {
      const res = await CheckAuth(token);
      setIsLogin(res);
    };

    const token = Cookies.get("token");
    if (token !== undefined) {
      islogin(token);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between p-5">
        <div className="flex ml-10">
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
        <MenuBar side="left" isLogin={isLogin} />
        <div className="flex gap-14 mr-10">
          {links.map(
            (ele, index) =>
              ele.protected === isLogin && (
                <button key={index} className="hover:text-blue-500">
                  <Link href={ele.url}>{ele.name}</Link>
                </button>
              )
          )}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
