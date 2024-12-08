import { GetParty } from "@/actions/party-actions";
import { VerifyAuth } from "@/lib/verify";
import { GetVoteTimes } from "@/actions/vote-actions";
import { Navbar } from "@/components/customs/navbar";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";
import { CalculateTotalHours, getJoinList, getTimeSlotBlocks, getUserVoteblocks } from "@/lib/utils";
import { PartyTimelineCard } from "@/components/customs/party/inspect/party-timeline-card";
import { PartyJoinCard } from "@/components/customs/party/inspect/party-join-card";

export default async function PartyPage({
  params,
}: {
  params: { partyId: string };
}) {
  // Get party data
  const party = await GetParty(params.partyId).then((res) => res.data?.party);
  if (!party) redirect("/error");

  const { isAuth, user } = await VerifyAuth(false);

  // Get vote data
  const votes = await GetVoteTimes(party.partyid).then((res) => res.data);
  if (!votes) redirect("/error");

  const vote_blocks = getTimeSlotBlocks(
    votes,
    CalculateTotalHours(party),
    party
  );
  const user_votes = getUserVoteblocks(vote_blocks, user?.nickname);
  const join_list = getJoinList(votes);

  return (
    <div className="min-h-screen">
      <Toaster richColors />
      <Navbar isLogin={isAuth} HasFixed={false} isLoading={false} />
      <div className="flex flex-col gap-6 md:mx-7 md:flex-row mb-[100px]">
        <PartyTimelineCard
          className="col-span-4 flex-1"
          party={party}
          user={user}
          allvoteblocks={vote_blocks}
          user_votes={user_votes}
          VoteNumber={join_list.length}
        />
        <PartyJoinCard
          className="col-span-2 flex-initial w-full md:w-1/3"
          allvoteblocks={vote_blocks}
          joinList={join_list}
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
