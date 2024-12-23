import { prisma } from "../app";

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

export const handleGoogleOAuthCallback = async (req: any, res: any) => {
  const { provider, id, displayName, emails } = req.user;

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

export const DeleteAccount = async (req: any, res: any) => {
  try {
    if (!req.user) throw new Error("你尚未登入");

    const user = await prisma.user.delete({
      where: {
        id: req.user.id,
      },
    });

    if (!user) throw new Error("使用者不存在！");

    res.status(200).json({ message: "帳戶已刪除！" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const CheckAuth = async (req: any, res: any) => {
  try {
    if (!req.user) throw new Error("你尚未登入");

    let user = await prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
    });

    if (!user) throw new Error("使用者不存在！");

    const FilterUser = {
      id: user.id,
      nickname: user.nickname,
      email: user.email,
    };

    res.status(200).json({ ...FilterUser });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const UpdateUserName = async (req: any, res: any) => {
  try {
    const { nickname } = await req.body;
    if (!nickname) throw new Error("請提供暱稱");

    let user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        nickname,
      },
    });

    if (!user) throw new Error("使用者不存在！");

    res.status(200).json({ nickname: user.nickname });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};