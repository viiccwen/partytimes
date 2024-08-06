import { party_return_schema_type } from "@/lib/type";
import { PartyJoinCard } from "./party-join-card";
import { PartyTimelineCard } from "./party-timeline-card";


interface InspectPartyPanelProps {
    party: party_return_schema_type;
}

export const InspectPartyPanel = ({ party } : InspectPartyPanelProps) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-6 gap-6">
        <PartyTimelineCard className="col-span-4" party={party} />
        <PartyJoinCard  className="col-span-2" joinList={null} />
      </div>
    </div>
  );
};
