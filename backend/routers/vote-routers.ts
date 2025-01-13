import {
  CreateVote,
  DeleteVote,
  GetVoteTimes,
} from "../controllers/vote-controllers";
import { Router } from "express";

const vote_router = Router();

vote_router.post("/vote/create", CreateVote);
vote_router.get("/vote/get", GetVoteTimes);
vote_router.delete("/vote/delete/:partyid/:userid", DeleteVote);

export default vote_router;
