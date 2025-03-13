import { party_return_schema_type } from "@/lib/type";
import { create } from "zustand";

type party_type = {
  party: party_return_schema_type;

  setParty: (party: party_return_schema_type) => void;
};

export const usePartyStore = create<party_type>((set) => ({
  party: {} as party_return_schema_type,
  setParty: (party: party_return_schema_type) => set({ party }),
}));
