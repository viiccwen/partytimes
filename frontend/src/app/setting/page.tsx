import { Navbar } from "@/components/customs/navbar";
import { Toaster } from "sonner";
import { cookies } from "next/headers";
import { CheckAuth, GetUserInfo } from "@/actions/user-actions";
import { redirect } from "next/navigation";
import { userinfo_fetch_return_type } from "@/lib/type";
import { SettingCard } from "@/components/customs/setting/setting-card";

export default async function SettingPage() {
  const Cookies = cookies();
  const token: string | undefined = Cookies.get("token")?.value
    ? Cookies.get("token")?.value
    : undefined;

  const auth: boolean = await CheckAuth(token);

  const userinfo: userinfo_fetch_return_type = await GetUserInfo(token);
  const id: number = userinfo.data?.id ? userinfo.data.id : -1;
  const nickname: string = userinfo.data?.nickname
    ? userinfo.data.nickname
    : "";
  const email: string = userinfo.data?.email ? userinfo.data.email : "";

  if (!auth) {
    redirect("/login");
  }

  return (
    <>
      <Toaster richColors />
      <Navbar />
      <div className="m-[50px]">
        <SettingCard id={id} email={email} nickname={nickname} />
      </div>
    </>
  );
}
