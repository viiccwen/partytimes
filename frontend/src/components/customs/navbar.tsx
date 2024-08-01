"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "../ui/button";

import { CheckAuth } from "../../../actions/auth-actions";

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
    <div className="fixed w-full bg-slate-900">
      <div className="flex justify-end p-5 gap-5">
        {links.map(
          (ele, index) =>
            ele.protected === isLogin && (
              <Button key={index} asChild>
                <Link href={ele.url}>{ele.name}</Link>
              </Button>
            )
        )}
      </div>
    </div>
  );
};
