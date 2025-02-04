import { prisma } from "../db";
import type { Request, Response } from "express";
import { extractToken } from "../middlewares/auth";
import { createUser, deleteGuest, findGuest, findUser } from "../utils/user";
import type { PayloadType } from "../utils/user.type";
import { Verify } from "../utils/verify";
import {
  createVote,
  deleteVote,
  findManyVote,
  findVote,
  updateVote,
} from "../utils/vote";
import type { VoteType } from "../utils/vote.type";

// situation
/**
1. user vote - done (use token to verify)
2. guest vote (use nickname to verify, and no guestid -> create new guest)
3. guest update vote by user (use guestid to verify)
4. guest update vote by guest (use guestid to verify)
*/
const getUser = async (
  req: Request,
  guestid: string,
  nickname: string,
  email: string
) => {
  // 1. Guest Update Vote by Guest or User (with guestid)
  if (guestid) {
    const user = await findGuest("id", guestid);
    if (!user) throw new Error("這是一位無效的訪客或是已登入的用戶！");

    return user;
  }

  // 2. Check for token (User Vote)
  if (extractToken(req)) {
    const token = extractToken(req);
    if (!token) throw new Error("未授權用戶！");

    // verify token
    const payload = Verify(token) as PayloadType & {
      iat: number;
      exp: number;
    };

    if (!payload) throw new Error("未授權用戶！");

    const user = await findUser(`${payload.provider}Id`, payload.id);
    if (!user) throw new Error("使用者不存在！");

    return user;
  }

  // 3. Guest Vote (with nickname, create new guest if no guestid)
  if (nickname) {
    const user =
      (await findUser("nickname", nickname)) ||
      (await createUser({
        nickname,
        email,
        username: nickname,
        password: "guest",
        role: "GUEST",
        githubId: null,
        googleId: null,
        accessToken: null,
        refreshToken: null,
      }));

    return user;
  }

  return null;
};

export const CreateVote = async (req: Request, res: Response) => {
  try {
    const { timeslots, partyid, nickname, email, guestid } = await req.body;

    if (!timeslots || !partyid) {
      throw new Error("請提供所有必要資訊");
    }

    const user = await getUser(req, guestid, nickname, email);
    if (!user) throw new Error("未授權");

    const voteData: VoteType = {
      creatorName: user.nickname || nickname,
      partyid,
      userId: user.id,
    };

    // Check if user has already voted
    const old_vote = await findVote(partyid, user.id);

    // Update Vote
    if (old_vote) {
      const deleted_timeslots = await prisma.timeSlot.deleteMany({
        where: { votetimeId: old_vote.id },
      });
      if (!deleted_timeslots) throw new Error("更新失敗！");

      const new_vote = await updateVote(old_vote.id, voteData, timeslots);
      if (!new_vote) throw new Error("更新失敗！");

      res.status(200).json({ new_vote });
      return;
    }

    // create new vote
    const new_vote = await createVote(voteData, timeslots);
    if (!new_vote) throw new Error("投票失敗！");

    res.status(200).json({ new_vote });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const GetVoteTimes = async (req: any, res: any) => {
  try {
    const { partyid } = await req.query;

    if (!partyid) throw new Error("請提供所有必要資訊");

    const votes = await findManyVote(partyid);
    if (!votes) throw new Error("找不到投票資訊！");

    res.status(200).json(votes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const DeleteVote = async (req: any, res: any) => {
  try {
    const { partyid, userid } = await req.params;
    const token: string | null = extractToken(req);

    if (!userid || !partyid) {
      throw new Error("請提供所有必要資訊");
    }

    let guest = await findGuest("id", userid);

    if (guest) {
      const vote = await findVote(partyid, userid);
      if (!vote) throw new Error("投票不存在");

      const deleted_vote = await deleteVote(vote.id);
      if (!deleted_vote) throw new Error("刪除失敗！");

      // delete guest
      const deleted_guest = await deleteGuest(userid);
      if (!deleted_guest) throw new Error("刪除失敗！");

      res.sendStatus(200);
      return;
    }

    if (!token) throw new Error("你尚未登入");

    const payload = Verify(token) as PayloadType & {
      iat: number;
      exp: number;
    };
    if (!payload) throw new Error("未授權用戶");

    const user = await findUser(`${payload.provider}Id`, payload.id);
    if(!user || user.id != userid) throw new Error("未授權用戶");

    const vote = await findVote(partyid, userid);
    if (!vote) throw new Error("投票不存在");

    const deletedVote = await deleteVote(vote.id);
    if (!deletedVote) throw new Error("刪除失敗！");

    res.sendStatus(200);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
