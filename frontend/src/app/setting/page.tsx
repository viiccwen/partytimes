import { Navbar } from "@/components/customs/navbar";
import { Toaster } from "sonner";
import { VerifyAuth } from "@/lib/verify";
import { SettingCard } from "@/components/customs/setting/setting-card";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Setting",
};

export default async function SettingPage() {
  const { isAuth, user } = await VerifyAuth(true);

  if (!isAuth) redirect("/login");

  return (
    <div className="h-screen">
      <Toaster richColors />
      <Navbar isLogin={isAuth} HasFixed={false} isLoading={false} />
      <div className="m-[20px] md:m-[50px]">
        <SettingCard email={user!.email} nickname={user!.nickname} />
      </div>
    </div>
  );
}
