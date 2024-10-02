import { Navbar } from "@/components/customs/navbar";
import { Toaster } from "sonner";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Auth } from "@/actions/user-actions";
import { redirect } from "next/navigation";
import { SelectPartyTimeContainer } from "@/components/customs/party/create/select-partytime-container";

export const metadata: Metadata = {
  title: "Create",
};

export default async function PartyCreatePage() {
  const token: string | undefined = cookies().get("token")?.value;
  const { correct: auth, data: user, error } = await Auth(token);

  if (!auth) redirect("/login");

  return (
    <div className="h-screen">
      <Navbar isLogin={auth} HasFixed={false} />
      <Toaster richColors />
      <SelectPartyTimeContainer />
    </div>
  );
}
