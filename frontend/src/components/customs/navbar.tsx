"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MenuBar } from "./menubar";

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
    name: "登入",
    url: "/login",
    protected: false,
  },
];

interface NavbarProps {
  isLogin: boolean;
  isLoading: boolean;
  HasFixed: boolean;
}

export const Navbar = ({ isLogin, isLoading, HasFixed }: NavbarProps) => {
  const router = useRouter();

  return (
    <div
      className={`w-full ${HasFixed ? "fixed" : ""} backdrop-blur-sm drop-shadow-xl z-10`}
    >
      <div className="flex justify-between p-5">
        <div className="flex ml-3 md:hidden">
          <MenuBar side="left" isLogin={isLogin} />
        </div>
        <div className="flex justify-center md:ml-10">
          <Image
            src="/PartyTimes-logo.png"
            alt="logo"
            width={170}
            height={50}
            className="cursor-pointer dark:invert"
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
        <div className="flex ml-3 invisible">
          <MenuBar side="left" isLogin={isLogin} />
        </div>
        <div className="hidden gap-14 md:mr-10 mr-3 md:flex">
          <div className="hidden md:flex">
            {links.map(
              (ele, index) =>
                ele.protected === isLogin && (
                  <button
                    key={index}
                    className="text-white bg-blue-600 px-5 py-2 rounded-full mr-10 transition duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg"
                    hidden={isLoading}
                  >
                    {<Link href={ele.url}>{ele.name}</Link>}
                  </button>
                ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
