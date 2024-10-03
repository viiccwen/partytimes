import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DeleteAccountButton } from "./delete-account-button";
import { EditNameButton } from "./edit-name-button";
import { BackButton } from "../back-button";
import { ModeToggle } from "../mode-toggle";
import { redirect } from "next/navigation";

interface SettingCardProps {
  email: string;
  nickname: string;
}

export const SettingCard = async ({ nickname, email }: SettingCardProps) => {
  return (
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
            <div className="flex items-center">
              <p className="font-bold w-[60px] md:w-[100px]">名稱</p>
              <div className="flex items-center gap-4">
                <p>{nickname}</p>
                <EditNameButton value={nickname} />
              </div>
            </div>
            <div className="flex items-center">
              <p className="font-bold w-[60px] md:w-[100px]">Email</p>
              <div className="flex items-center gap-4">
                <p>{email}</p>
              </div>
            </div>
            <div className="flex items-center">
              <p className="font-bold w-[60px] md:w-[100px]">外觀</p>
              <div className="flex items-center gap-4">
                <ModeToggle />
              </div>
            </div>
          </div>
          <div className="space-y-5">
            <div className="text-lg font-bold">進階設定</div>
            <Separator />
            <div className="">
              <div className="flex items-center gap-5">
                <div className="flex flex-col gap-2">
                  <p className="font-bold text-red-500">刪除帳號</p>
                  <p className="text-sm text-slate-500">
                    This will delete your account as well as all events and poll
                    responses you&apos;ve created. This action cannot be undone.
                  </p>
                </div>
                <DeleteAccountButton />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
