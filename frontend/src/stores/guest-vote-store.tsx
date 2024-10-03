import { timeslots_create_schema_type } from "@/lib/type";
import { create } from "zustand";

type GuestVoteStoreType = {
  open: boolean;
  timeslots: timeslots_create_schema_type;
  guestId: number;
  setOpen: (open: boolean) => void;
  setTimeslots: (timeslots: timeslots_create_schema_type) => void;
  setGuestId: (guestId: number) => void;
};

export const useGuestVoteStore = create<GuestVoteStoreType>((set) => ({
  open: false,
  timeslots: [],
  guestId: -1,
  setOpen: (open) => set({ open }),
  setTimeslots: (timeslots) => set({ timeslots }),
  setGuestId: (guestId) => set({ guestId }),
}));
