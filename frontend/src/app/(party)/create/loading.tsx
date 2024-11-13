import { Navbar } from "@/components/customs/navbar";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Navbar isLogin={false} HasFixed={false} />
      <div className="flex flex-col justify-center items-center mt-5 gap-5">
        <p className="text-2xl font-bold">創建派對 🎉</p>
        <Card className="flex flex-wrap h-auto p-5 gap-[100px] w-[400px] md:w-[850px]">
          <div className="flex flex-col gap-5 w-full">
            <Skeleton className="W-4/5 h-7" />
            <Skeleton className="w-4/5 h-7" />
            <Skeleton className="w-3/5 h-7" />
            <Skeleton className="w-2/5 h-7" />
            <Skeleton className="w-3/5 h-7" />
          </div>
          <div className="flex flex-col gap-5 w-full">
            <Skeleton className="w-2/5 h-7" />
            <Skeleton className="w-4/5 h-7" />
            <Skeleton className="w-3/5 h-7" />
            <Skeleton className="w-2/5 h-7" />
            <Skeleton className="w-3/5 h-7" />
          </div>
        </Card>
      </div>
    </>
  );
}
