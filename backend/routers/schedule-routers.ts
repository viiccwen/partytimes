import { DecideSchedule, DeleteSchedule } from "../controllers/schedule-controllers";
import { AuthMiddleware } from "../middlewares/auth";

const express = require('express');
const schedule_router = express.Router();

schedule_router.post('/schedule/create', DecideSchedule);
schedule_router.delete('/schedule/delete/:partyid', DeleteSchedule);

export default schedule_router;