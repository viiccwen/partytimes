"use server";

import {
  get_votetimes_fetch_return_type,
  party_return_schema_type,
} from "@/lib/type";
import { GetVoteTimes } from "@/actions/vote-actions";
import { ampm } from "@/lib/schema";
import { GetUserInfo } from "@/actions/user-actions";
import { cookies } from "next/headers";
import { InspectPartyContainer } from "./inspect-party-container";
import { redirect } from "next/navigation";
import { CalculateTotalHours } from "@/lib/party-timeline-helper";

interface InspectPartyPanelProps {
  party: party_return_schema_type;
}

export const InspectPartyPanel = async ({ party }: InspectPartyPanelProps) => {
  const cookie = cookies();
  const token: string | undefined = cookie.get("token")?.value
    ? cookie.get("token")?.value
    : undefined;

  const votes = await GetVoteTimes(party.partyid);
  if (votes.data === undefined) redirect("/error");

  const userinfo = await GetUserInfo(token);

  const nickname: string = userinfo.data?.nickname
    ? userinfo.data.nickname
    : "";

  const total_hours = CalculateTotalHours(party);

  return (
    <>
      <div className="w-full">
        <div className="grid grid-cols-6 gap-6">
          <InspectPartyContainer
            party={party}
            votes={votes.data}
            total_hours={total_hours}
            nickname={nickname}
          />
        </div>
      </div>
    </>
  );
};