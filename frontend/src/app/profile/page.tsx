import { CheckAuth, GetUserInfo } from "@/actions/user-actions";
import { Navbar } from "@/components/customs/navbar";
import { PartyPanel } from "@/components/customs/party-panel";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

import { userinfo_fetch_return_type } from "@/lib/type";
import { GetPartyList } from "@/actions/party-actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const Cookies = cookies();
  const token: string | undefined = Cookies.get("token")?.value
    ? Cookies.get("token")?.value
    : undefined;

  const isLogin = await CheckAuth(token);
  const userinfo: userinfo_fetch_return_type = await GetUserInfo(token);
  const id: string = userinfo.data?.id ? userinfo.data.id : "-1";
  const nickname: string = userinfo.data?.nickname
    ? userinfo.data.nickname
    : "";
  const email: string = userinfo.data?.email ? userinfo.data.email : "";

  if (!isLogin || token === undefined || !userinfo.correct) {
    redirect("/login");
  }

  const party = await GetPartyList(token);

  if (!party.correct || !party.data) {
    redirect("/error");
  }

  return (
    <div className="min-h-screen">
      <Toaster richColors />
      <Navbar isLogin={isLogin} HasFixed={false} />
      <div className="m-7">
        <PartyPanel
          token={token}
          id={id}
          nickname={nickname}
          email={email}
          parties={party.data.party}
        />
      </div>
    </div>
  );
}
