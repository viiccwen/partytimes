import { CreateVote, GetVoteTimes } from "../controllers/vote-controllers";


const express = require('express');
const vote_router = express.Router();

vote_router.post('/vote/create', CreateVote);
vote_router.get('/vote/get', GetVoteTimes);

export default vote_router;