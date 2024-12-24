import {
  createCalendarEvent,
  deleteCalendarEvent,
} from "../controllers/calendar-controllers";
import {
  DecideSchedule,
  DeleteSchedule,
} from "../controllers/schedule-controllers";
import { AuthMiddleware } from "../middlewares/auth";

const express = require("express");
const schedule_router = express.Router();

// todo: add middleware
schedule_router.post(
  "/schedule/create",
  DecideSchedule,
  createCalendarEvent
);
schedule_router.delete(
  "/schedule/delete/:partyid",
  AuthMiddleware,
  DeleteSchedule,
  deleteCalendarEvent
);

export default schedule_router;
