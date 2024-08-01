"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PartyTable } from "./profile/party-table";
import { SettingButton } from "./profile/setting-button";
import { LogOutButton } from "./profile/logout-button";

export const PartyPanel = () => {
  return (
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
      <TabsContent value="all"><PartyTable /></TabsContent>
      <TabsContent value="planned"></TabsContent>
      <TabsContent value="unplanned"></TabsContent>
      <TabsContent value="responed"></TabsContent>
    </Tabs>
  );
};
