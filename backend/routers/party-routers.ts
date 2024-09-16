import { CreateParty, DeleteParty, GetParty, GetPartyList, UpdateParty } from "../controllers/party-controllers";
import { AuthMiddleware } from "../middlewares/auth";

const express = require('express');
const party_router = express.Router();

party_router.post('/party/create', AuthMiddleware, CreateParty);
party_router.get('/party/get', GetParty);
party_router.get('/party/list', AuthMiddleware, GetPartyList);
party_router.post('/party/delete', AuthMiddleware, DeleteParty);
party_router.post('/party/update', AuthMiddleware, UpdateParty);

export default party_router;