import { verify, type Secret } from "jsonwebtoken";
import { randomBytes } from "crypto";

const JWT_SECRET = process.env.JWT_SECRET;

export const GeneratePartyId = () => {
  // only contain english letters and numbers
  const partyid = randomBytes(32).toString("base64");
  // remove special characters
  return partyid.replace(/[^a-zA-Z0-9]/g, "").substr(0, 8);
};

export const Verify = (token: string) => {
  try {
    const payload = verify(token, JWT_SECRET as Secret);
    return payload;
  } catch (error: any) {
    throw new Error("驗證失敗！");
  }
};
