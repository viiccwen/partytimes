import { Navbar } from "@/components/customs/navbar";
import { SelectPartyTimePanel } from "@/components/customs/party/create/select-partytime-panel";
import { Toaster } from "sonner";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { CheckAuth } from "@/actions/user-actions";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create",
};

export default async function PartyCreatePage() {
  const cookie = cookies();
  const token: string | undefined = cookie.get("token")?.value
    ? cookie.get("token")?.value
    : undefined;

  const isLogin = await CheckAuth(token);

  if (!isLogin) {
    redirect("/login");
  }

  return (
    <div className="h-screen">
      <Navbar isLogin={isLogin} HasFixed={false} />
      <Toaster richColors />
      <SelectPartyTimePanel />
    </div>
  );
}
