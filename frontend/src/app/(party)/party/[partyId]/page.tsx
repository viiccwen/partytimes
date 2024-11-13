import { GetParty } from "@/actions/party-actions";
import { VerifyAuth } from "@/lib/verify";
import { GetVoteTimes } from "@/actions/vote-actions";
import { Navbar } from "@/components/customs/navbar";
import { InspectPartyContainer } from "@/components/customs/party/inspect/inspect-party-container";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

export default async function PartyPage({
  params,
}: {
  params: { partyId: string };
}) {
  const party = await GetParty(params.partyId).then((res) => res.data?.party);
  if (!party) redirect("/error");

  const { isAuth, user } = await VerifyAuth(false);

  const votes = await GetVoteTimes(party.partyid);
  if (!votes.data) redirect("/error");

  return (
    <div className="min-h-screen">
      <Toaster richColors />
      <Navbar isLogin={isAuth} HasFixed={false} />
      <div className="flex flex-col gap-6 md:mx-7 md:flex-row mb-[100px]">
        <InspectPartyContainer party={party} user={user} votes={votes.data} />
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
