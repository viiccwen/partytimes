import { Navbar } from "@/components/customs/navbar";
import { Toaster } from "sonner";
import { Metadata } from "next";
import { VerifyAuth } from "@/lib/verify";
import { CreatePartyCard } from "@/components/customs/party/create/create-party-card";

export const metadata: Metadata = { title: "Create" };

export default async function PartyCreatePage() {
  const { isAuth, user } = await VerifyAuth(true);

  return (
    <div>
      <Navbar isLogin={isAuth} HasFixed={false} />
      <Toaster richColors />
      <CreatePartyCard />
    </div>
  );
}
