import { prisma } from "../db";
import type { CreateUserType, GitHubEmailType, UserType } from "./user.type";

export const findUser = async (type: keyof UserType, value: string) => {
  return await prisma.user.findFirst({
    where: {
      [type]: value,
    },
  });
};

export const findGuest = async (type: keyof UserType, value: string) => {
  return await prisma.user.findFirst({
    where: {
      [type]: value,
      role: "GUEST",
    },
  });
};

export const getUserEmails = async (accessToken: string) => {
  try {
    const response = await fetch("https://api.github.com/user/emails", {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `token ${accessToken}`,
      },
    }).then((res) => res.json());

    return response as GitHubEmailType[];
  } catch (error) {
    throw new Error("取得email失敗...");
  }
};

export const createUser = async (user: CreateUserType) => {
  return await prisma.user.create({
    data: {
      ...user,
    },
  });
};

export const deleteUser = async (user: UserType) => {
  try {
    return await prisma.user.delete({
      where: {
        id: user.id,
      },
    });
  } catch (error) {
    throw new Error("刪除失敗...");
  }
};

export const deleteGuest = async (userid: string) => {
  return await prisma.user.delete({
    where: {
      id: userid,
      role: "GUEST",
    },
  });
};

export const updateUser = async (
  user: UserType,
  type: keyof UserType,
  data: string
) => {
  try {
    return await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        [type]: data,
      },
    });
  } catch (error) {
    throw new Error("更新名稱失敗...");
  }
};
