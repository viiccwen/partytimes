import { Navbar } from "@/components/customs/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen">
      <Navbar isLogin={false} HasFixed={false} />
      <div className="flex flex-col gap-6 md:mx-7 md:flex-row mb-[100px]">
        <Card className="col-span-4 flex-1">
          <CardContent className="p-10 flex flex-col gap-5">
            <Skeleton className="W-4/5 h-7" />
            <Skeleton className="w-4/5 h-7" />
            <Skeleton className="w-3/5 h-7" />
            <Skeleton className="w-2/5 h-7" />
            <Skeleton className="w-3/5 h-7" />
            <Skeleton className="W-4/5 h-7" />
            <Skeleton className="w-4/5 h-7" />
            <Skeleton className="w-3/5 h-7" />
            <Skeleton className="w-2/5 h-7" />
            <Skeleton className="w-3/5 h-7" />
          </CardContent>
        </Card>

        <Card className="col-span-2 flex-initial w-full md:w-1/3">
          <CardContent className="flex flex-col p-10 gap-5">
            <Skeleton className="W-4/5 h-7" />
            <Skeleton className="w-4/5 h-7" />
            <Skeleton className="w-3/5 h-7" />
            <Skeleton className="w-2/5 h-7" />
            <Skeleton className="w-3/5 h-7" />
            <Skeleton className="w-4/5 h-7" />
            <Skeleton className="w-3/5 h-7" />
            <Skeleton className="w-2/5 h-7" />
            <Skeleton className="w-3/5 h-7" />
            <Skeleton className="W-4/5 h-7" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
