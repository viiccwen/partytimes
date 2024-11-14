import { Navbar } from "@/components/customs/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="h-screen">
      <Navbar isLogin={false} HasFixed={false} isLoading={true} />
      <div className="m-[20px] md:m-[50px]">
        <Card className="p-10">
          <CardContent className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <Skeleton className="w-4/5 h-5" />
              <Skeleton className="w-3/5 h-5" />
              <Skeleton className="w-5/8 h-5" />
            </div>
            <div className="flex flex-col gap-5">
              <Skeleton className="w-4/5 h-5" />
              <Skeleton className="w-3/5 h-5" />
              <Skeleton className="w-5/8 h-5" />
            </div>
            <div className="flex flex-col gap-5">
              <Skeleton className="w-4/5 h-5" />
              <Skeleton className="w-3/5 h-5" />
              <Skeleton className="w-5/8 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
