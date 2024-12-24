import { PrismaClient } from "@prisma/client";
import party_router from "./routers/party-routers";
import user_router from "./routers/user-routers";
import vote_router from "./routers/vote-routers";
import schedule_router from "./routers/schedule-routers";
import oauth_router from "./routers/oauth-routers";
import email_router from "./routers/mail-routers";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const dotenv = require("dotenv");

if(process.env.NODE_ENV === "production") 
  dotenv.config({ path: ".env" });
else
  dotenv.config({ path: ".env.development" });

const API_PORT = process.env.API_PORT || 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/api", user_router);
app.use("/api", party_router);
app.use("/api", vote_router);
app.use("/api", schedule_router);
app.use("/api", oauth_router);
app.use("/api", email_router);

export const prisma = new PrismaClient();

export default app;