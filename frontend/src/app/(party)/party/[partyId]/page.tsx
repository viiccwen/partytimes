import { GetParty } from "@/actions/party-actions";
import { VerifyAuth } from "@/lib/verify";
import { GetVoteTimes } from "@/actions/vote-actions";
import { Navbar } from "@/components/customs/navbar";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";
import {
  CalculateTotalHours,
  getJoinList,
  getTimeSlotBlocks,
  getUserVoteblocks,
} from "@/lib/utils";
import { PartyContent } from "@/components/customs/party/inspect/party-content";

export default async function PartyPage({
  params,
}: {
  params: { partyId: string };
}) {
  // Get party data todo: change to tanstack/query
  const party = await GetParty(params.partyId).then((res) => res.data?.party);
  if (!party) redirect("/error");

  const { isAuth, user } = await VerifyAuth(false);

  // Get vote data
  const votes = await GetVoteTimes(party.partyid).then((res) => res.data);
  if (!votes) redirect("/error");

  // Get time slot blocks for each vote
  const vote_blocks = getTimeSlotBlocks(
    votes,
    CalculateTotalHours(party),
    party,
  );
  const user_votes = getUserVoteblocks(vote_blocks, user?.nickname);
  const join_lists = getJoinList(votes);

  return (
    <div className="min-h-screen">
      <Toaster richColors />
      <Navbar isLogin={isAuth} HasFixed={false} isLoading={false} />
      <div className="flex flex-col gap-6 md:mx-7 md:flex-row mb-[100px]">
        <PartyContent
          initial_party={party}
          initial_vote_blocks={vote_blocks}
          initial_join_lists={join_lists}
          user={user}
          user_votes={user_votes}
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
