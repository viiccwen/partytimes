import { create } from "zustand";

type Type = {
    page: number;
    selectedDate: string[];
    setPage: (page: number) => void;
    setSelectedDate: (selectedDate: string[]) => void;
};

export const CreatePartyStore = create<Type>((set) => ({
    page: 1,
    selectedDate: [],
    setPage: (page: number) => set({ page }),
    setSelectedDate: (selectedDate: string[]) => set({ selectedDate }),
}));