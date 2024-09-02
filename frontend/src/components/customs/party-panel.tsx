"use client";

import { useEffect, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PartyTable } from "./profile/party-table";
import { SettingButton } from "./profile/setting-button";
import { LogOutButton } from "./profile/logout-button";

import { party_return_schema_type } from "@/lib/type";
import { NicknameAlertDialog } from "./user/nickname-alert-dialog";

import { EditName } from "@/actions/user-actions";
import { z } from "zod";
import { toast } from "sonner";

interface PartyPanelProps {
  token: string;
  id: number;
  email: string;
  nickname: string;
  parties: party_return_schema_type[];
}

const nickname_schema = z.object({
  nickname: z.string().min(1, "暱稱不可為空").max(20, "暱稱過長"),
});

type nickname_schema_type = z.infer<typeof nickname_schema>;

export const PartyPanel = ({
  token,
  id,
  email,
  nickname,
  parties,
}: PartyPanelProps) => {

  const [open, setOpen] = useState<boolean>(!nickname);
  const [hydrated, setHydrated] = useState<boolean>(false);

  const onSubmit = async (formdata: nickname_schema_type) => {
    const { nickname } = formdata;
    const response = await EditName(nickname);

    if (response.correct) {
      setOpen(false);
      toast.success("暱稱設定成功");
    } else {
      toast.error(response.error);
    }
  };

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <>
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between">
          {/* todo: response party function */}
          <TabsList className="grid md:w-[400px] grid-cols-3">
            <TabsTrigger value="all" className="text-xs md:text-sm">所有</TabsTrigger>
            <TabsTrigger value="planned" className="text-xs md:text-sm">已計畫</TabsTrigger>
            <TabsTrigger value="unplanned" className="text-xs md:text-sm">未計畫</TabsTrigger>
            {/* <TabsTrigger value="responed" className="text-xs md:text-sm">回覆</TabsTrigger> */}
          </TabsList>
          <div className="flex gap-3">
            <SettingButton />
            <LogOutButton />
          </div>
        </div>

        <TabsContent value="all">
          <PartyTable initialParty={parties} token={token} />
        </TabsContent>
        <TabsContent value="planned">
          <PartyTable
            initialParty={parties.filter(
              (content: party_return_schema_type) => content.status === true
            )}
            token={token}
          />
        </TabsContent>
        <TabsContent value="unplanned">
          <PartyTable
            initialParty={parties.filter(
              (content: party_return_schema_type) => content.status === false
            )}
            token={token}
          />
        </TabsContent>
        {/* <TabsContent value="responed">待施工...</TabsContent> */}
      </Tabs>

      <NicknameAlertDialog open={open} onSubmit={onSubmit} />
    </>
  );
};
