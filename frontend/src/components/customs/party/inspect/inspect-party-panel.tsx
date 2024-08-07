import { party_return_schema_type } from "@/lib/type";
import { PartyJoinCard } from "./party-join-card";
import { PartyTimelineCard } from "./party-timeline-card";
import { CreateVote, GetVoteTimes } from "@/actions/vote-actions";

interface InspectPartyPanelProps {
  party: party_return_schema_type;
}

export const InspectPartyPanel = async ({ party }: InspectPartyPanelProps) => {
  const votes = await GetVoteTimes(party.partyid);

  return (
    <>
      <div className="w-full">
        <div className="grid grid-cols-6 gap-6">
          <PartyTimelineCard
            className="col-span-4"
            party={party}
            votes={votes.data}
          />
          <PartyJoinCard className="col-span-2" joinList={null} />
        </div>
      </div>
    </>
  );
};
