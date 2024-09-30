import { Navbar } from "@/components/customs/navbar";
import { Toaster } from "sonner";
import { cookies } from "next/headers";
import { Auth } from "@/actions/user-actions";
import { redirect } from "next/navigation";
import { SettingCard } from "@/components/customs/setting/setting-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Setting",
};

export default async function SettingPage() {
  const token: string | undefined = cookies().get("token")?.value;
  const { correct: auth, data: user, error } = await Auth(token);
  if (!auth || user === undefined) redirect("/login");

  return (
    <div className="h-screen">
      <Toaster richColors />
      <Navbar isLogin={auth} HasFixed={false} />
      <div className="m-[20px] md:m-[50px]">
        <SettingCard email={user.email} nickname={user.nickname} />
      </div>
    </div>
  );
}
