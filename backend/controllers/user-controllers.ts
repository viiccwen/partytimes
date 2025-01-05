import { prisma } from "../app";

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
