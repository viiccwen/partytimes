import { prisma } from "..";

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

export const Login = async (req: any, res: any) => {
  try {
    const { username, password } = await req.body;

    if (!username || !password) {
      throw new Error("Please provide username and password");
    }

    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!user) {
      throw new Error("Wrong username or password");
    }

    const isMatch = await Bun.password.verify(user.password, password);

    if (isMatch) {
      const token = jwt.sign({ id: user.id }, JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: "12h",
      });

      res.status(200).json({ token: token });
    } else {
      throw new Error("Wrong username or password");
    }
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

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
      throw new Error(`Failed to get emails...`);
    }

    const email_data = await response.json();
    const primaryEmail = email_data.find((email: any) => email.primary)?.email;

    if (!primaryEmail) {
      throw new Error("No primary email found...");
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

export const Register = async (req: any, res: any) => {
  try {
    const { username, nickname, password, email } = await req.body;

    // check for missing fields
    if (!username || !nickname || !password || !email) {
      throw new Error("Please provide username and password");
    }

    let user;

    // check for existing user
    user = await prisma.user.findFirst({
      where: { username: username },
    });

    if (user) throw new Error("Username already exists");

    user = await prisma.user.findFirst({
      where: { email: email },
    });

    if (user) throw new Error("Email already exists");

    const hashedPassword = await Bun.password.hash(password);

    const newUser = await prisma.user.create({
      data: {
        username: username,
        nickname: nickname,
        password: hashedPassword,
        email: email,
      },
    });

    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "12h",
    });

    res.status(200).json({ token: token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const CheckAuth = async (req: any, res: any) => {
  if (req.user) {
    res.status(200).json({ message: "You are logged in" });
  } else {
    res.status(401).json({ message: "You are not logged in" });
  }
};

export const DeleteAccount = async (req: any, res: any) => {
  try {
    if (!req.user) throw new Error("You are not logged in");

    const user = await prisma.user.delete({
      where: {
        id: req.user.id,
      },
    });

    if (!user) throw new Error("User not found");

    res.status(200).json({ message: "Account deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const GetUserInfo = async (req: any, res: any) => {
  try {
    if (!req.user) throw new Error("You are not logged in");

    let user = await prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
    });

    if (!user) throw new Error("User not found");

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
    if (!nickname) throw new Error("Please provide a nickname");

    let user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        nickname,
      },
    });

    if (!user) throw new Error("User not found");

    res.status(200).json({ nickname: user.nickname });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const UpdateUserEmail = async (req: any, res: any) => {
  try {
    if (!req.user) throw new Error("You are not logged in");
    if (!req.body.email) throw new Error("Please provide a email");

    // check for existing user
    let user = await prisma.user.findFirst({
      where: { email: req.body.email },
    });

    if (user) throw new Error("Email already exists");

    user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        email: req.body.email,
      },
    });

    if (!user) throw new Error("User not found");

    res.status(200).json({ email: user.email });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
