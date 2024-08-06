import { CreateParty, GetParty, GetPartyList } from "../controllers/party-controllers";
import { AuthMiddleware } from "../middlewares/auth";

const express = require('express');
const party_router = express.Router();

party_router.post('/party/create', AuthMiddleware, CreateParty);
party_router.get('/party/get', GetParty);
party_router.get('/party/list', AuthMiddleware, GetPartyList);

export default party_router;