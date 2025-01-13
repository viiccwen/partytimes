import type { User } from "@prisma/client";
import type { PayloadType } from "../utils/user.type";
import { sign } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

export const googleOAuthCallback = async (req: any, res: any) => {
  try {
    const user: User = req.user!;

    const payload: PayloadType = {
      provider: "google",
      id: user.googleId!,
    };

    const token = sign(payload, JWT_SECRET, { expiresIn: "12h" });
    res.redirect(`${process.env.AUTH_REDIRECT_URL}?token=${token}`);
  } catch (error: any) {
    res.redirect(`${process.env.AUTH_REDIRECT_URL}?error=${error.message}`);
  }
};

export const gitHubOAuthCallback = async (req: any, res: any) => {
  try {
    const user: User = req.user!;

    const payload: PayloadType = {
      provider: "github",
      id: user.githubId!,
    };

    const token = sign(payload, JWT_SECRET, { expiresIn: "12h" });
    res.redirect(`${process.env.AUTH_REDIRECT_URL}?token=${token}`);
  } catch (error: any) {
    res.redirect(`${process.env.AUTH_REDIRECT_URL}?error=${error.message}`);
  }
};
