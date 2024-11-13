import { Navbar } from "@/components/customs/navbar";
import { Toaster } from "sonner";
import { Metadata } from "next";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Profile",
};

export default function Loading() {
  return (
    <div className="min-h-screen">
      <Toaster richColors />
      <Navbar isLogin={false} HasFixed={false} />
      <div className="md:m-7 mt-5">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-between">
            {/* todo: response party function */}
            <TabsList className="grid md:w-[400px] grid-cols-3">
              <TabsTrigger value="all" className="text-xs md:text-sm">
                所有
              </TabsTrigger>
              <TabsTrigger value="planned" className="text-xs md:text-sm">
                已計畫
              </TabsTrigger>
              <TabsTrigger value="unplanned" className="text-xs md:text-sm">
                未計畫
              </TabsTrigger>
              {/* <TabsTrigger value="responed" className="text-xs md:text-sm">回覆</TabsTrigger> */}
            </TabsList>
            <div className="flex gap-3"></div>
          </div>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Party 🎉</CardTitle>
                <CardDescription>都可以有Party...輸光...</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col gap-4">
                    <Skeleton className="w-4/5 h-[30px]" />
                    <Skeleton className="w-3/5 h-[30px]" />
                    <Skeleton className="w-5/8 h-[30px]" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <Skeleton className="w-4/5 h-[30px]" />
                    <Skeleton className="w-3/5 h-[30px]" />
                    <Skeleton className="w-5/8 h-[30px]" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <Skeleton className="w-4/5 h-[30px]" />
                    <Skeleton className="w-3/5 h-[30px]" />
                    <Skeleton className="w-5/8 h-[30px]" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <Skeleton className="w-4/5 h-[30px]" />
                    <Skeleton className="w-3/5 h-[30px]" />
                    <Skeleton className="w-5/8 h-[30px]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="planned"></TabsContent>
          <TabsContent value="unplanned"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
