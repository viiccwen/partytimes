import { Navbar } from "@/components/customs/navbar";
import { Toaster } from "sonner";
import { VerifyAuth } from "@/actions/user-actions";
import { SettingCard } from "@/components/customs/setting/setting-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Setting",
};

export default async function SettingPage() {
  const { isAuth, user } = await VerifyAuth(true);

  return (
    <div className="h-screen">
      <Toaster richColors />
      <Navbar isLogin={isAuth} HasFixed={false} />
      <div className="m-[20px] md:m-[50px]">
        <SettingCard email={user!.email} nickname={user!.nickname} />
      </div>
    </div>
  );
}
