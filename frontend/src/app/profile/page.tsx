import { CheckAuth, CheckNickname } from "@/actions/user-actions";
import { Navbar } from "@/components/customs/navbar";
import { PartyPanel } from "@/components/customs/party-panel";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

// check for valid user
export default async function ProfilePage() {
  const Cookies = cookies();
  const token: string | undefined = Cookies.get("token")?.value ? Cookies.get("token")?.value : undefined;

  const auth: boolean = await CheckAuth(token);
  const nameValidate: boolean = await CheckNickname(token);

  if (!auth || token === undefined) {
    redirect("/login");
  }

  return (
    <>
      <Toaster richColors />
      <Navbar />
      <div className="m-7">
        <PartyPanel _open={nameValidate} />
      </div>
    </>
  );
}
