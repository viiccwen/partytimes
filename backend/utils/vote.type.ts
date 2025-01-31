import type { Votetime } from "@prisma/client";

export type VoteType = Omit<Votetime, "id">;