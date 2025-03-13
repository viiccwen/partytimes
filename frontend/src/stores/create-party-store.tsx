import { create } from "zustand";

type create_party_type = {
  selectedDate: string[];
  isLoading: boolean;
  setSelectedDate: (date: string[]) => void;
  setIsLoading: (loading: boolean) => void;
};

export const useCreatePartyStore = create<create_party_type>((set) => ({
  selectedDate: [],
  isLoading: false,
  setSelectedDate: (date: string[]) => set({ selectedDate: date }),
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
}));
