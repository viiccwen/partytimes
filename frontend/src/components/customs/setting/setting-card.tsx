"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Edit2, Trash2, Undo2 } from "lucide-react";
import { DeleteAccountButton } from "./delete-account-button";

import { Suspense, useEffect, useState } from "react";
import { HydrateProvider } from "../hydrate-provider";
import { Skeleton } from "@/components/ui/skeleton";
import { EditNameButton } from "./edit-name-button";
import { EditEmailButton } from "./edit-email-button";
import { BackButton } from "../back-button";

const Cookie = require("js-cookie");

export const SettingCard = () => {
  const [name, setName] = useState<string>(Cookie.get("name") || "");
  const [email, setEmail] = useState<string>(Cookie.get("email") || "");
  const [hydrated, setHydrated] = useState<boolean>(false);

  // magic trick
  useEffect(() => {
    setHydrated(true);
  }, []);

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
            <div className="flex gap-[100px] items-center">
              <p className="font-bold">名稱</p>
              <div className="flex items-center gap-4">
                <HydrateProvider hydrated={hydrated} width={120} height={20}>
                  <p>{name}</p>
                  <EditNameButton value={name} />
                </HydrateProvider>
              </div>
            </div>
            <div className="flex gap-[90px] items-center">
              <p className="font-bold">Email</p>
              <div className="flex items-center gap-4">
                <HydrateProvider hydrated={hydrated} width={120} height={20}>
                  <p>{email}</p>
                  <EditEmailButton value={email} />
                </HydrateProvider>
              </div>
            </div>
          </div>
          <div className="space-y-5">
            <div className="text-lg font-bold">進階設定</div>
            <Separator />
            <div className="">
              <div className="flex items-center gap-5">
                <div className="flex flex-col gap-5">
                  <p className="font-bold text-red-500">刪除帳號</p>
                  <p className="text-sm text-slate-500">
                    This will delete your account as well as all events and poll
                    responses you've created. This action cannot be undone.
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
