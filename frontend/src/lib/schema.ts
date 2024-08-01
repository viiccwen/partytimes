import { z } from "zod";

export const register_schema = z.object({
  username: z
    .string()
    .min(6, "使用者帳號至少6位數")
    .max(20, "使用者帳號最多20位數"),
  password: z
    .string()
    .min(6, "使用者密碼至少6位數")
    .max(20, "使用者密碼最多20位數"),
  email: z.string().email("請輸入正確的email格式"),
});
