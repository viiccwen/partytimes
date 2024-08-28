"use client";

import { useEffect, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PartyTable } from "./profile/party-table";
import { SettingButton } from "./profile/setting-button";
import { LogOutButton } from "./profile/logout-button";

import { GetPartyList } from "@/actions/party-actions";
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
}

const nickname_schema = z.object({
  nickname: z.string().min(1, "暱稱不可為空").max(20, "暱稱過長"),
});

type nickname_schema_type = z.infer<typeof nickname_schema>;

export const PartyPanel = ({ token, id, email, nickname }: PartyPanelProps) => {
  const [party, setParty] = useState<party_return_schema_type[]>([]);
  const [open, setOpen] = useState<boolean>(!nickname);

  useEffect(() => {
    const GetAllParty = async () => {
      const response = await GetPartyList();

      if (response.correct) {
        const party_list = response.data?.parties;
        if (party_list) {
          setParty(party_list);
        }
      }
    };

    GetAllParty();
  }, []);

  const onSubmit = async (formdata: nickname_schema_type) => {
    const { nickname } = formdata;
    const response = await EditName(nickname);

    if (response.correct) {
      setOpen(false);
      toast.success("暱稱設定成功");
    } else {
      console.log(response.error);
    }
  };

  return (
    <>
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between">
          <TabsList className="grid w-[400px] grid-cols-4">
            <TabsTrigger value="all">所有</TabsTrigger>
            <TabsTrigger value="planned">已計畫</TabsTrigger>
            <TabsTrigger value="unplanned">未計畫</TabsTrigger>
            <TabsTrigger value="responed">回覆</TabsTrigger>
          </TabsList>
          <div className="flex gap-3">
            <SettingButton />
            <LogOutButton />
          </div>
        </div>

        <TabsContent value="all">
          <PartyTable party={party} />
        </TabsContent>
        <TabsContent value="planned">
          <PartyTable
            party={party.filter(
              (content: party_return_schema_type) => content.status === true
            )}
          />
        </TabsContent>
        <TabsContent value="unplanned">
          <PartyTable
            party={party.filter(
              (content: party_return_schema_type) => content.status === false
            )}
          />
        </TabsContent>
        <TabsContent value="responed">{/* Todo: response party */}</TabsContent>
      </Tabs>

      <NicknameAlertDialog open={open} onSubmit={onSubmit} />
    </>
  );
};
