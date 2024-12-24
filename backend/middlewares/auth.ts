import { google } from "googleapis";
import { prisma } from "../app";
import { Verify } from "../utils/utils";

const extractToken = (req: any): string | null => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer "))
    return authHeader.split(" ")[1];

  return null;
};

export const AuthMiddleware = async (req: any, res: any, next: any) => {
  try {
    // extract token
    const token = extractToken(req);
    if (!token) throw new Error("未授權！");

    // verify token
    const payload: any = await Verify(token);

    // find user
    const currentUser = await prisma.user.findFirst({
      where: {
        id: payload.id,
      },
    });
    if (!currentUser) throw new Error("未授權！");

    req.user = currentUser;
    next();
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
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
