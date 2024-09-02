import { z } from "zod";

export const register_schema = z.object({
  username: z
    .string()
    .min(6, "使用者帳號至少6位數")
    .max(20, "使用者帳號最多20位數"),
  nickname: z
    .string()
    .min(1, "使用者暱稱不可為空")
    .max(20, "使用者暱稱最多20位數"),
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

export const guest_schema = z.object({
  nickname: z.string().min(1, "不可為空"),
  email: z.string().optional(),
});

export const user_info_schema = z.object({
  id: z.number(),
  nickname: z.string(),
  email: z.string(),
})

export const ampm = ["AM", "PM"] as const;

export const decision_schema = z.object({
  id: z.number().optional(),
  date: z.string(),
  start_time: z.number(),
  start_ampm: z.enum(ampm),
  end_time: z.number(),
  end_ampm: z.enum(ampm),
  partyid: z.string().optional(),
});

export const party_create_schema = z.object({
  title: z.string().min(1, "派對名稱不可為空").max(30, "派對名稱最多30字"),
  description: z.string().max(50, "派對簡介最多50字"),
  start_time: z.string(),
  start_ampm: z.enum(ampm),
  end_time: z.string(),
  end_ampm: z.enum(ampm),
});

export const party_return_schema = z.object({
  title: z.string(),
  partyid: z.string(),
  description: z.string(),
  status: z.boolean(),
  date: z.array(z.string()),
  start_time: z.number(),
  start_ampm: z.enum(ampm),
  end_time: z.number(),
  end_ampm: z.enum(ampm),
  decision: decision_schema,
});

export const party_edit_schema = z.object({
  title: z.string().min(1, "派對名稱不可為空").max(30, "派對名稱最多30字"),
  description: z.string().max(50, "派對簡介最多50字"),
});


export const timeslots_create_schema = z.array(z.object({
  date: z.string(),
  start_time: z.number(),
  start_ampm: z.enum(ampm),
  end_time: z.number(),
  end_ampm: z.enum(ampm),
}));

export const timeslots_return_schema = timeslots_create_schema.element.merge(z.object({
  id: z.number(),
  votetimeId: z.number(),
}));

export const votes_schema = z.object({
  id: z.number(),
  creatorName: z.string(),
  userId: z.string(),
  partyid: z.string(),
  timeslots: z.array(timeslots_return_schema),
});