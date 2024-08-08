import { Button } from "@/components/ui/button";
import { party_return_schema_type } from "@/lib/type";
import { LucideCalendarCheck2, PenLine } from "lucide-react";
import { ShareURLButton } from "../../ShareURLButton";
import { EditButton } from "../../profile/edit-button";

interface PartyHeaderProps {
  party: party_return_schema_type;
  className?: string;
}

export const PartyHeader = ({ party, className }: PartyHeaderProps) => {
  return (
    <div className={className}>
      <div className="flex justify-between">
        <p className="text-2xl font-bold">{party.title}</p>
        <div className="flex gap-2">
          <ShareURLButton />
          <EditButton
            partyid={party.partyid}
            partyTitle={party.title}
            partyDescription={party.description}
            text="編輯"
          />
        </div>
      </div>
      <div>{party.description}</div>
    </div>
  );
};
