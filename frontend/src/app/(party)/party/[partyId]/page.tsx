import { GetParty } from "@/actions/party-actions";
import { GetUserInfo } from "@/actions/user-actions";
import { GetVoteTimes } from "@/actions/vote-actions";
import { Navbar } from "@/components/customs/navbar";
import { InspectPartyContainer } from "@/components/customs/party/inspect/inspect-party-container";
import { CalculateTotalHours } from "@/lib/party-timeline-helper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

export default async function PartyPage({
  params,
}: {
  params: { partyId: string };
}) {
  const party = await GetParty(params.partyId);
  const party_data = party.data?.party;

  if (!party.correct || party_data === undefined) {
    redirect("/error");
  }

  const cookie = cookies();
  const token: string | undefined = cookie.get("token")?.value
    ? cookie.get("token")?.value
    : undefined;

  const votes = await GetVoteTimes(party_data.partyid);
  if (votes.data === undefined) redirect("/error");

  const userinfo = await GetUserInfo(token);

  const nickname: string = userinfo.data?.nickname
    ? userinfo.data.nickname
    : "";

  const userid: number = userinfo.data?.id
    ? userinfo.data.id
    : -1;

  const total_hours = CalculateTotalHours(party_data);

  // debug
  console.log(party_data);

  return (
    <>
      <Toaster richColors />
      <Navbar />
      <div className="m-7">
        <div className="w-full">
          <div className="grid grid-cols-6 gap-6">
            <InspectPartyContainer
              party={party_data}
              votes={votes.data}
              total_hours={total_hours}
              nickname={nickname}
              userid={userid}
            />
          </div>
        </div>
      </div>
    </>
  );
}
