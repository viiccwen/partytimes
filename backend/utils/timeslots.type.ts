
import type { TimeSlot } from "@prisma/client";

export type TimeSlotType = Omit<TimeSlot, "id">;