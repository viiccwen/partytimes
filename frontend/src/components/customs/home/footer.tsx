"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const linkblocks_title = [
    "產品",
    "關於",
    "聯絡",
    "文件",
];

const linkblocks = [
  [
    {
      link: "#",
      text: "更新紀錄",
    },
    {
      link: "#",
      text: "意見回饋",
    },
  ],
  [
    {
      link: "#",
      text: "關於產品",
    },
    {
      link: "#",
      text: "關於作者",
    },
  ],
  [
    {
      link: "#",
      text: "GitHub",
    },
    {
      link: "#",
      text: "Discord",
    },
  ],
  [
    {
      link: "#",
      text: "使用者條款",
    },
    {
      link: "#",
      text: "隱私權政策",
    },
  ],
];

export const Footer = () => {
  return (
    <div className="flex justify-center">
      <div className="w-[1000px]">
        <div className={cn("flex flex-col mt-[200px] mx-5 justify-between", "md:flex-row")}>
          <div className={cn("flex flex-row justify-evenly items-center", "md:flex-col md:h-[300px] md:items-start")}>
            <Image
              src="/PartyTimes-logo.png"
              alt="logo"
              width={200}
              height={100}
              className="invert"
            />
            <div className="text-slate-300 text-sm ml-4 mt-1">© 2024 PartyTimes</div>
          </div>
          <div className={cn("grid grid-cols-2 items-center gap-16 mt-10", "md:flex md:h-[300px] md:flex-row md:mt-0")}>
            {linkblocks.map((linkBlock, index) => (
              <LinkBlock title={linkblocks_title[index]} linkblocks={linkBlock} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

type LinkType = {
  link: string;
  text: string;
};

interface LinkBlockProp {
  title: string;
  linkblocks: LinkType[];
}

const LinkBlock = ({ title, linkblocks }: LinkBlockProp) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="font-bold text-white">{title}</div>
      {linkblocks.map((linkblock, index) => (
        <Link
        key={`linkblock-${index}`}
          href={linkblock.link}
          className="text-slate-200 transition-all duration-300 hover:text-white"
        >
          {linkblock.text}
        </Link>
      ))}
    </div>
  );
};
