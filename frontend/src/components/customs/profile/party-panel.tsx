"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingButton } from "@/components/customs/profile/setting-button";
import { LogOutButton } from "@/components/customs/profile/logout-button";
import { PartyTable } from "@/components/customs/profile/party-table";
import { party_return_schema_type } from "@/lib/type";

interface PartyPanelProps {
    party: party_return_schema_type[];
}

export const PartyPanel = ({ party } : PartyPanelProps) => {
  return (
    <Tabs defaultValue="all" className="w-full">
      <div className="flex justify-between">
        {/* todo: response party function */}
        <TabsList className="grid md:w-[400px] grid-cols-3">
          <TabsTrigger value="all" className="text-xs md:text-sm">
            所有
          </TabsTrigger>
          <TabsTrigger value="planned" className="text-xs md:text-sm">
            已計畫
          </TabsTrigger>
          <TabsTrigger value="unplanned" className="text-xs md:text-sm">
            未計畫
          </TabsTrigger>
          {/* <TabsTrigger value="responed" className="text-xs md:text-sm">回覆</TabsTrigger> */}
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
      {/* <TabsContent value="responed">待施工...</TabsContent> */}
    </Tabs>
  );
};
