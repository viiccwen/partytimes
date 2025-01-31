import {
  CheckAuth,
  DeleteAccount,
  UpdateUserName,
} from "../controllers/user-controllers";
import { AuthMiddleware } from "../middlewares/auth";
import { Router } from "express";

const user_router = Router();

user_router.get("/user", AuthMiddleware, CheckAuth);

user_router.delete("/user/delete", AuthMiddleware, DeleteAccount);

user_router.post("/user/update/name", AuthMiddleware, UpdateUserName);

export default user_router;
