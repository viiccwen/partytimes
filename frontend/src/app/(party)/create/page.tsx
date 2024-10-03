import { Navbar } from "@/components/customs/navbar";
import { Toaster } from "sonner";
import { Metadata } from "next";
import { VerifyAuth } from "@/actions/user-actions";
import { SelectPartyTimeContainer } from "@/components/customs/party/create/select-partytime-container";

export const metadata: Metadata = {
  title: "Create",
};

export default async function PartyCreatePage() {
  const { isAuth, user } = await VerifyAuth(true);

  return (
    <div className="h-screen">
      <Navbar isLogin={isAuth} HasFixed={false} />
      <Toaster richColors />
      <SelectPartyTimeContainer />
    </div>
  );
}
