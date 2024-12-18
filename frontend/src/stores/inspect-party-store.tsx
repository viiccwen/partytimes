import { create } from "zustand";

export type block_type = {
  creatorName: string;
  userId: string;
  isScheduled: boolean;
};

export type joinlist_type = {
  creatorName: string;
  userId: string;
};

export type position_type = {
  row: number;
  col: number;
};

export type clicked_user_type = {
  userId: string;
  creatorName: string;
};

type party_inspect_type = {
  cur_points_position: position_type;
  cur_points_userid: string;
  clicked_user: clicked_user_type;
  isEditing: boolean;
  isScheduling: boolean;
  isMouseDown: boolean;
  isBounced: boolean;
  isConfirmClicked: boolean;
  isDeleteClicked: boolean;
  isScheduledClicked: boolean;

  updateCurPointsPosition: (row: number, col: number) => void;
  updateCurPointsUserid: (userid: string) => void;
  updateClickedUser: (userId: string, creatorName: string) => void;
  updateIsEditing: (isEditing: boolean) => void;
  updateIsScheduling: (isScheduling: boolean) => void;
  updateIsMouseDown: (isMouseDown: boolean) => void;
  updateIsBounced: (isBounced: boolean) => void;
  updateIsConfirmClicked: (isConfirmClicked: boolean) => void;
  updateIsDeleteClicked: (isDeleteClicked: boolean) => void;
  updateIsScheduledClicked: (isScheduledClicked: boolean) => void;
};

export const useVoteBlockStore = create<party_inspect_type>((set) => ({
  cur_points_position: { row: -1, col: -1 },
  cur_points_userid: "",
  clicked_user: { userId: "", creatorName: "" },
  isEditing: false,
  isScheduling: false,
  isMouseDown: false,
  isBounced: false,
  isConfirmClicked: false,
  isDeleteClicked: false,
  isScheduledClicked: false,

  updateCurPointsPosition: (row, col) =>
    set({ cur_points_position: { row, col } }),
  updateCurPointsUserid: (userid) => set({ cur_points_userid: userid }),
  updateClickedUser: (userId, creatorName) =>
    set({ clicked_user: { userId, creatorName } }),
  updateIsEditing: (isEditing) => set({ isEditing }),
  updateIsScheduling: (isScheduling) => set({ isScheduling }),
  updateIsMouseDown: (isMouseDown) => set({ isMouseDown }),
  updateIsBounced: (isBounced) => set({ isBounced }),
  updateIsConfirmClicked: (isConfirmClicked) => set({ isConfirmClicked }),
  updateIsDeleteClicked: (isDeleteClicked) => set({ isDeleteClicked }),
  updateIsScheduledClicked: (isScheduledClicked) => set({ isScheduledClicked }),

  
}));
