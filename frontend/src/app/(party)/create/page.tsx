import { Navbar } from "@/components/customs/navbar";
import { Toaster } from "sonner";
import { Metadata } from "next";
import { VerifyAuth } from "@/lib/verify";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { DayPicker } from "@/components/customs/party/create/day-picker";
import { CreatePartyForm } from "@/components/customs/party/create/create-party-form";

export const metadata: Metadata = { title: "Create" };

export default async function PartyCreatePage() {
  const { isAuth, user } = await VerifyAuth(true);

  if (!isAuth) redirect("/login");

  return (
    <div>
      <Navbar isLogin={isAuth} HasFixed={false} isLoading={false} />
      <Toaster richColors />

      <div className="flex flex-col justify-center items-center mt-5 mb-10 gap-5">
        <p className="text-2xl font-bold">創建派對 🎉</p>
        <Card className="flex flex-wrap flex-grow h-auto p-5 gap-[30px]">
          <DayPicker className="w-full md:w-fit" />
          <CreatePartyForm className="flex flex-col justify-between gap-5 h-full" />
        </Card>
      </div>
    </div>
  );
}
