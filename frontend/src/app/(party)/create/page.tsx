import { Navbar } from "@/components/customs/navbar";
import { Toaster } from "sonner";
import { Metadata } from "next";
import { VerifyAuth } from "@/lib/verify";
import { CreatePartyCard } from "@/components/customs/party/create/create-party-card";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Create" };

export default async function PartyCreatePage() {
  const { isAuth, user } = await VerifyAuth(true);

  if (!isAuth) redirect("/login");

  return (
    <div>
      <Navbar isLogin={isAuth} HasFixed={false} isLoading={false} />
      <Toaster richColors />
      <CreatePartyCard />
    </div>
  );
}
