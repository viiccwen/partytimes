import { GetParty } from "@/actions/party-actions";
import { CheckAuth, GetUserInfo } from "@/actions/user-actions";
import { GetVoteTimes } from "@/actions/vote-actions";
import { Navbar } from "@/components/customs/navbar";
import { InspectPartyContainer } from "@/components/customs/party/inspect/inspect-party-container";
import { CalculateTotalHours } from "@/components/customs/party/inspect/timeline/party-timeline-helper";
import { decision_schema_type } from "@/lib/type";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

export default async function PartyPage({
  params,
}: {
  params: { partyId: string };
}) {
  const party = await GetParty(params.partyId).then((res) => res.data?.party);
  if(!party) redirect("/error");

  const cookie = cookies();
  const token: string | undefined = cookie.get("token")?.value
    ? cookie.get("token")?.value
    : undefined;

  const isLogin = await CheckAuth(token);

  const votes = await GetVoteTimes(party.partyid);
  if (!votes.data) redirect("/error");

  const userinfo = await GetUserInfo(token);

  const nickname: string = userinfo.data?.nickname
    ? userinfo.data.nickname
    : "";

  const userid: string = userinfo.data?.id ? userinfo.data.id : "-1";

  const total_hours = CalculateTotalHours(party);
  const scheduled_time: decision_schema_type | null = party.decision;

  return (
    <div className="min-h-screen">
      <Toaster richColors />
      <Navbar isLogin={isLogin} HasFixed={false} />
      <div className="flex flex-col gap-6 md:mx-7 md:flex-row mb-[100px]">
        <InspectPartyContainer
          party={party}
          votes={votes.data}
          total_hours={total_hours}
          nickname={nickname}
          userid={userid}
          scheduled_time={scheduled_time}
          isLogin={isLogin}
        />
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { partyId: string };
}): Promise<Metadata> {
  const party = await GetParty(params.partyId);
  const party_data = party.data?.party;

  if (!party.correct || party_data === undefined) {
    redirect("/error");
  }

  return {
    title: party_data.title,
  };
}
