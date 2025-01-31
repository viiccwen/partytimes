import type { Party } from "@prisma/client";


export type PartyType = Omit<Party, "id">;