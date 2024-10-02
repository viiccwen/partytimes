import { Auth } from "@/actions/user-actions";
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
  const Cookies = cookies();
  const token: string | undefined = Cookies.get("token")?.value;
  
  const { correct: auth, data: user, error } = await Auth(token);
  if (!auth || token === undefined) redirect("/login");

  const party = await GetPartyList(token);
  if (!party.correct || !party.data) redirect("/error");

  return (
    <div className="min-h-screen">
      <Toaster richColors />
      <Navbar isLogin={auth} HasFixed={false} />
      <div className="md:m-7 mt-5">
        <PartyPanel
          parties={party.data.party}
        />
      </div>
    </div>
  );
}
