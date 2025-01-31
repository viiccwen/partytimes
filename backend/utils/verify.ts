import { verify, type JwtPayload, type Secret } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const Verify = (token: string) => {
  try {
    const payload: string | JwtPayload = verify(token, JWT_SECRET as Secret);
    return payload;
  } catch (error: any) {
    throw new Error("驗證失敗！");
  }
};
