"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface DescriptionBlockProps {
  className?: string;
  title: string;
  description: string;
  image: string;
  reverse: boolean;
}

export const DescriptionBlock = ({
  className,
  title,
  description,
  image,
  reverse,
}: DescriptionBlockProps) => {
  return (
    <div className="flex justify-center">
      <div className="w-[1000px]">
        <div
          className={cn(
            "flex flex-col mx-5 justify-between gap-5",
            "md:flex-row md:gap-[100px]",
            className,
            reverse ? "md:flex-row-reverse" : "md:flex-row"
          )}
        >
          <div className="flex flex-col justify-center gap-3 mb-10">
            <div className="text-sky-200 text-2xl font-bold">{title}</div>
            <div className="text-slate-100 text-lg">{description}</div>
          </div>
          <div>
            <Image
              className={cn("rounded-2xl transition-all duration-300 ease-in-out", "hover:shadow-xl")}
              src={image}
              alt="home"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
