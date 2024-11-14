import { VerifyAuth } from "@/lib/verify";
import { Navbar } from "@/components/customs/navbar";
import { PartyPanel } from "@/components/customs/party-panel";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

import { GetPartyList } from "@/actions/party-actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const { isAuth, user } = await VerifyAuth(true);

  if(!isAuth) redirect("/login");
  
  const token: string | undefined = cookies().get("token")?.value;
  const {correct, data, error} = await GetPartyList(token);
  if (!correct || !data) redirect("/error");

  return (
    <div className="min-h-screen">
      <Toaster richColors />
      <Navbar isLogin={isAuth} HasFixed={false} isLoading={false} />
      <div className="md:m-7 mt-5">
        <PartyPanel
          parties={data.party}
        />
      </div>
    </div>
  );
}
