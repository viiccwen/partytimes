import { CreateVote, DeleteVote, GetVoteTimes } from "../controllers/vote-controllers";


const express = require('express');
const vote_router = express.Router();

vote_router.post('/vote/create', CreateVote);
vote_router.get('/vote/get', GetVoteTimes);
vote_router.delete('/vote/delete/:partyid/:userid', DeleteVote);

export default vote_router;