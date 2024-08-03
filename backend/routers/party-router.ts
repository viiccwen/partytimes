import { CreateParty, GetParty } from "../controllers/party-controllers";
import { AuthMiddleware } from "../middlewares/auth";

const express = require('express');
const party_router = express.Router();

party_router.post('/party/create', AuthMiddleware, CreateParty);
party_router.get('/party/get', GetParty);

export default party_router;