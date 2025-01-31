import { create } from "zustand";
import { joinlist_type } from "./inspect-party-store";

type timeline_user_type = {
  join_lists: joinlist_type[];

  setJoinLists: (join_lists: joinlist_type[]) => void;
};

export const useTimelineUserStore = create<timeline_user_type>((set) => ({
  join_lists: [],
  setJoinLists: (join_lists) => set({ join_lists }),
}));
