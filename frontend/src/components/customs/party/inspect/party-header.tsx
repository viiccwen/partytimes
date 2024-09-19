import { party_return_schema_type } from "@/lib/type";
import { ShareURLButton } from "../../ShareURLButton";
import { EditButton } from "../../profile/edit-button";

interface PartyHeaderProps {
  party: party_return_schema_type;
  className?: string;
}

export const PartyHeader = ({ party, className }: PartyHeaderProps) => {
  return (
    <div className={className}>
      <div className="flex justify-between items-center">
        <p className="text-lg md:text-2xl font-bold md:hidden">{party.title.length > 14 ? party.title.substring(0, 14) + "..." : party.title}</p>
        <p className="text-xl md:text-2xl font-bold hidden md:block">{party.title}</p>
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
      <div className="text-sm md:text-base">{party.description}</div>
    </div>
  );
};
