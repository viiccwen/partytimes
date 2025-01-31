import { Router } from "express";
import {
  createCalendarEvent,
  deleteCalendarEvent,
} from "../controllers/calendar-controllers";
import {
  DecideSchedule,
  DeleteSchedule,
} from "../controllers/schedule-controllers";

const schedule_router = Router();

schedule_router.post(
  "/schedule/create",
  DecideSchedule,
  createCalendarEvent
);
schedule_router.delete(
  "/schedule/delete/:partyid",
  DeleteSchedule,
  deleteCalendarEvent
);

export default schedule_router;
