import { SendFeedbackMail } from "../controllers/mail-controllers";

const express = require("express");
const router = express.Router();

router.post("/mail/feedback", SendFeedbackMail);

export default router;