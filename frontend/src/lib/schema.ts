import { string, z } from "zod";

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

export const login_schema = z.object({
  username: z
    .string()
    .min(6, "使用者帳號至少6位數")
    .max(20, "使用者帳號最多20位數"),
  password: z
    .string()
    .min(6, "使用者密碼至少6位數")
    .max(20, "使用者密碼最多20位數"),
})

export const party_return_schema = z.object({
  title: z.string(),
  partyid: z.string(),
  description: z.string(),
  status: z.boolean(),
  date: z.array(z.string()),
  start_time: z.number(),
  start_ampm: z.string(),
  end_time: z.number(),
  end_ampm: z.string(),
});

export const party_edit_schema = z.object({
  title: z.string().min(1, "派對名稱不可為空").max(30, "派對名稱最多30字"),
  description: z.string().max(50, "派對簡介最多50字"),
});