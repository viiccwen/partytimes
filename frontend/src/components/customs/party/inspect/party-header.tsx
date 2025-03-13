"use client";
import { ShareURLButton } from "../../ShareURLButton";
import { EditButton } from "../../profile/edit-button";
import { usePartyStore } from "@/stores/party-store";

interface PartyHeaderProps {
  className?: string;
  isLogin: boolean;
}

export const PartyHeader = ({ className, isLogin }: PartyHeaderProps) => {
  const { party } = usePartyStore();

  if (!party.title) return null;

  return (
    <div className={className}>
      <div className="flex justify-between items-center">
        <p className="text-lg md:text-2xl font-bold md:hidden">
          {party.title.length > 14
            ? party.title.substring(0, 14) + "..."
            : party.title}
        </p>
        <p className="text-xl md:text-2xl font-bold hidden md:block">
          {party.title}
        </p>
        <div className="flex gap-2">
          <ShareURLButton />
          {isLogin && (
            <EditButton
              partyid={party.partyid}
              partyTitle={party.title}
              partyDescription={party.description}
              text="編輯"
            />
          )}
        </div>
      </div>
      <div className="text-sm md:text-base">{party.description}</div>
    </div>
  );
};
