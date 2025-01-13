import type { $Enums, User } from "@prisma/client";

export interface CreateUserType {
  username: string;
  email: string;
  password: string;
  role: $Enums.Plan;
  githubId: string | null;
  googleId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface UserType extends User {
  id: string;
  email: string;
  username: string;
  nickname: string | null;
  password: string;
  role: $Enums.Plan;
  githubId: string | null;
  googleId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export type UserAttribute =
  | "id"
  | "username"
  | "email"
  | "role"
  | "githubId"
  | "googleId"
  | "accessToken"
  | "refreshToken";

export type PayloadType = {
  provider: string;
  id: string;
};

export interface GitHubEmailType {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string | null;
}
