"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface DescriptionBlockProps {
  className?: string;
  title: string;
  description: string;
  images: { src: string; className?: string }[];
  reverse: boolean;
}

export const DescriptionBlock = ({
  className,
  title,
  description,
  images,
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
          <div className="flex flex-col items-center justify-center gap-3 mb-10">
            <div className="text-purple-600 dark:text-purple-300 text-2xl font-bold">{title}</div>
            <div className="text-slate-600 dark:text-slate-300 text-lg">{description}</div>
          </div>
          <div className="relative flex justify-center">
            <div>
              {images.map((image, index) => (
                <Image
                  key={`image-${image.src}`}
                  className={cn(
                    "rounded-2xl transition-all duration-300 ease-in-out hover:shadow-lg",
                    image.className
                  )}
                  src={image.src}
                  alt={`image-${index}`}
                  width={400}
                  height={400}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
