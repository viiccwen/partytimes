import { SendFeedbackMail } from "../controllers/mail-controllers";
import express from "express";

const router = express.Router();

router.post("/mail/feedback", SendFeedbackMail);

export default router;