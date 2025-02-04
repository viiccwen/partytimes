import { google } from "googleapis";
import { prisma } from "../db";
import { verify } from "jsonwebtoken";
import { promisify } from "node:util";

import type { RequestHandler } from "express";
import type { PayloadType, UserType } from "../utils/user.type";
import { findUser } from "../utils/user";

const JWT_SECRET = process.env.JWT_SECRET || "";

export const extractToken = (req: any): string | null => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer "))
    return authHeader.split(" ")[1];

  return null;
};

const jwtVerifyPromise: (token: string, secret: string) => Promise<unknown> =
  promisify(verify);

const Verify = async (
  token: string,
  secret: string = JWT_SECRET
): Promise<unknown> => {
  return jwtVerifyPromise(token, secret);
};

export const AuthMiddleware: RequestHandler = async (req, res, next) => {
  try {
    // extract token
    const token = extractToken(req);
    if (!token) throw new Error("未授權！");

    // verify token
    const payload = (await Verify(token)) as PayloadType & {
      iat: number;
      exp: number;
    };

    // find user
    const providerId: keyof UserType = `${payload.provider}Id`;
    const user = await findUser(providerId, payload.id);

    if (!user) throw new Error("未授權！");

    req.user = user;
    next();
  } catch (error: any) {
    res.status(401).json({ error: error.message });
    return;
  }
};

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { refreshToken },
    });
    if (!user) throw new Error("未授權！");

    const oauth2Client = new google.auth.OAuth2(
      process.env.AUTH_GOOGLE_ID,
      process.env.AUTH_GOOGLE_SECRET,
      `${process.env.AUTH_REDIRECT_URL}/api/auth/callback/google`
    );

    // set refresh token
    oauth2Client.setCredentials({ refresh_token: refreshToken });

    // refresh access token
    const { token } = await oauth2Client.getAccessToken();
    if (!token) throw new Error("無法刷新 Token！");

    // update user token
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        accessToken: token,
      },
    });

    return oauth2Client;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
