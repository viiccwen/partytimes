import { prisma } from "../app";
import type { CreateUserType, GitHubEmailType, UserAttribute } from "./user.type";

export const findUser = async (type: UserAttribute, value: string) => {
  return await prisma.user.findFirst({
    where: {
      [type]: value,
    },
  });
};

export const createUser = async (user: CreateUserType) => {
  return await prisma.user.create({
    data: {
      ...user,
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