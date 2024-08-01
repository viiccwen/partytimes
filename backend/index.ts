import auth_router from "./routers/auth-routers";
import { PrismaClient } from "@prisma/client";

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const API_PORT = process.env.API_PORT || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", auth_router);

app.listen(API_PORT, () => {
    console.log(`Server is running on port ${API_PORT}`);
})

export const prisma = new PrismaClient();