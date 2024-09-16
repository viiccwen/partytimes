import { timeslots_create_schema_type } from "@/lib/type";
import { create } from "zustand";

type GuestVoteStoreType = {
    open: boolean;
    setOpen: (open: boolean) => void;
    timeslots: timeslots_create_schema_type;
    setTimeslots: (timeslots: timeslots_create_schema_type) => void;
    guestId: number;
    setGuestId: (guestId: number) => void;
};

export const useGuestVoteStore = create<GuestVoteStoreType>((set) => ({
    open: false,
    setOpen: (open) => set({ open }),
    timeslots: [],
    setTimeslots: (timeslots) => set({ timeslots }),
    guestId: -1,
    setGuestId: (guestId) => set({ guestId }),
}));