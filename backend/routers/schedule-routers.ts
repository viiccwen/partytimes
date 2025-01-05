import {
  createCalendarEvent,
  deleteCalendarEvent,
} from "../controllers/calendar-controllers";
import {
  DecideSchedule,
  DeleteSchedule,
} from "../controllers/schedule-controllers";

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
  DeleteSchedule,
  deleteCalendarEvent
);

export default schedule_router;
