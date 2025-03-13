import { create } from "zustand";
import { joinlist_type } from "./inspect-party-store";
import { user_info_schema_type } from "@/lib/type";

type timeline_user_type = {
  join_lists: joinlist_type[];
  user: user_info_schema_type | undefined;

  setJoinLists: (join_lists: joinlist_type[]) => void;
  setUser: (user: user_info_schema_type | undefined) => void;
};

export const useTimelineUserStore = create<timeline_user_type>((set) => ({
  join_lists: [],
  user: undefined,
  setJoinLists: (join_lists) => set({ join_lists }),
  setUser: (user) => set({ user }),
}));
