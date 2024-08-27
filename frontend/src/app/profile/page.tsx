import { CheckAuth, CheckNickname, GetUserInfo } from "@/actions/user-actions";
import { Navbar } from "@/components/customs/navbar";
import { PartyPanel } from "@/components/customs/party-panel";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

import { userinfo_fetch_return_type } from "@/lib/type";

// check for valid user
export default async function ProfilePage() {
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

  if (!auth || token === undefined || !userinfo.correct) {
    redirect("/login");
  }

  return (
    <>
      <Toaster richColors />
      <Navbar />
      <div className="m-7">
        <PartyPanel token={token} id={id} nickname={nickname} email={email} />
      </div>
    </>
  );
}
