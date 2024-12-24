import { prisma } from "../app";

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

export const handleGoogleOAuthCallback = async (req: any, res: any) => {
  const { provider, id, displayName, emails, accessToken, refreshToken } =
    req.user;

  try {
    let user = await prisma.user.findFirst({
      where: {
        [provider + "Id"]: id,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          username: displayName,
          nickname: displayName,
          email: emails[0].value,
          [provider + "Id"]: id,
          password: "", // oauth don't need password
          accessToken,
          refreshToken,
        },
      });
    } else {
      // Update access and refresh tokens if user already exists
      await prisma.user.update({
        where: { id: user.id },
        data: {
          accessToken,
          refreshToken,
        },
      });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "12h",
    });
    res.redirect(`${process.env.AUTH_REDIRECT_URL}?token=${token}`);
  } catch (error: any) {
    res.redirect(`${process.env.AUTH_REDIRECT_URL}?error=${error.message}`);
  }
};

export const handleGitHubOAuthCallback = async (req: any, res: any) => {
  const { provider, id, username, displayName, accessToken } = req.user;

  try {
    // get email
    const response = await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`取得email失敗...`);
    }

    const email_data = await response.json();
    const primaryEmail = email_data.find((email: any) => email.primary)?.email;

    if (!primaryEmail) {
      throw new Error("沒有主要email...");
    }

    let user = await prisma.user.findFirst({
      where: {
        [provider + "Id"]: id,
        email: primaryEmail,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          username: username,
          nickname: displayName,
          email: primaryEmail,
          [provider + "Id"]: id,
          password: "", // oauth don't need password
        },
      });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "12h",
    });
    res.redirect(`${process.env.AUTH_REDIRECT_URL}?token=${token}`);
  } catch (error: any) {
    res.redirect(`${process.env.AUTH_REDIRECT_URL}?error=${error.message}`);
  }
};
