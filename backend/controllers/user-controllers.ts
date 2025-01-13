import type { Request, Response } from "express";
import { deleteUser, updateUser } from "../utils/user";
import type { UserType } from "../utils/user.type";

export const DeleteAccount = async (req: Request, res: Response) => {
  try {
    const user = req.user! as UserType;
    await deleteUser(user);
    res.status(200).json({ message: "帳戶已刪除！" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const CheckAuth = async (req: any, res: any) => {
  try {
    const user = req.user! as UserType;

    const FilterUser = {
      username: user.username,
      nickname: user.nickname,
      email: user.email,
    };

    res.status(200).json({ ...FilterUser });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const UpdateUserName = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserType;
    const { nickname } = await req.body;

    const update_user = await updateUser(user, "nickname", nickname);

    res.status(200).json({ nickname: update_user.nickname });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
