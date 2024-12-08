import { Navbar } from "@/components/customs/navbar";
import { Toaster } from "sonner";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { VerifyAuth } from "@/lib/verify";
import { BackButton } from "@/components/customs/back-button";
import { EditNameButton } from "@/components/customs/setting/edit-name-button";
import { ModeToggle } from "@/components/customs/mode-toggle";
import { DeleteAccountButton } from "@/components/customs/setting/delete-account-button";

export const metadata: Metadata = {
  title: "Setting",
};

export default async function SettingPage() {
  const { isAuth, user } = await VerifyAuth(true);

  if (!isAuth || !user) redirect("/login");

  return (
    <div className="h-screen">
      <Toaster richColors />
      <Navbar isLogin={isAuth} HasFixed={false} isLoading={false} />
      <div className="m-[20px] md:m-[50px]">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                <p>設定</p>
                <BackButton url="/profile" />
              </div>
            </CardTitle>
            <CardDescription>設定你的個人資訊！</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-12">
              <div className="space-y-5">
                <div className="text-lg font-bold">基本資料</div>
                <Separator />
                
                <BasicBlock title="名稱">
                  <div className="flex items-center gap-4">
                    <p>{user.nickname}</p>
                    <EditNameButton name={user.nickname} />
                  </div>
                </BasicBlock>
                <BasicBlock title="Email">
                  <p>{user.email}</p>
                </BasicBlock>
                <BasicBlock title="外觀">
                  <ModeToggle />
                </BasicBlock>
              </div>

              <div className="space-y-5">
                <div className="text-lg font-bold">進階設定</div>
                <Separator />

                <div className="flex items-center gap-5">
                  <div className="flex flex-col gap-2">
                    <p className="font-bold text-red-500">刪除帳號</p>
                    <p className="text-sm text-slate-500">
                      This will delete your account as well as all events and
                      poll responses you&apos;ve created. This action cannot be
                      undone.
                    </p>
                  </div>
                  <DeleteAccountButton />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface BasicBlockProps {
  children: React.ReactNode;
  title: string;
}

const BasicBlock = (props: BasicBlockProps) => {
  return (
    <div className="flex items-center">
      <p className="font-bold w-[60px] md:w-[100px]">{props.title}</p>
      {props.children}
    </div>
  );
};
