import { CreateVote } from "../controllers/vote-controllers";


const express = require('express');
const vote_router = express.Router();

vote_router.post('/vote/create', CreateVote);

export default vote_router;