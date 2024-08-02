"use client";
import { Skeleton } from "@/components/ui/skeleton";

interface HydrateProviderProps {
  children: React.ReactNode;
  hydrated: boolean;
  width: number;
  height: number;
}

export const HydrateProvider = ({
  children,
  hydrated,
  width,
  height,
}: HydrateProviderProps) => {
  return (
    <>
      {hydrated ? (
        children
      ) : (
        <Skeleton className={`w-[${width}px] h-[${height}px] rounded-full`} />
      )}
    </>
  );
};
