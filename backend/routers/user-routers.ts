import { CheckAuth, DeleteAccount, UpdateUserName } from "../controllers/user-controllers";
import { AuthMiddleware } from "../middlewares/auth";


const express = require('express');

const user_router = express.Router();

user_router.get('/user', AuthMiddleware, CheckAuth);

user_router.post('/user/delete', AuthMiddleware, DeleteAccount);
user_router.post('/user/update/name', AuthMiddleware, UpdateUserName);

export default user_router;