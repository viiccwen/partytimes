import { CheckAuth, CheckNickname, DeleteAccount, GetUserInfo, Login, Register, UpdateUserEmail, UpdateUserName } from "../controllers/user-controllers";
import { AuthMiddleware } from "../middlewares/auth";


const express = require('express');

const user_router = express.Router();
user_router.post('/user/login', Login);
user_router.post('/user/register', Register);
user_router.get('/user/check', AuthMiddleware, CheckAuth);
user_router.get('/user/check/nickname', AuthMiddleware, CheckNickname);

user_router.get('/user/get', AuthMiddleware, GetUserInfo);

user_router.post('/user/delete', AuthMiddleware, DeleteAccount);

user_router.post('/user/update/name', AuthMiddleware, UpdateUserName);
user_router.post('/user/update/email', AuthMiddleware, UpdateUserEmail);

export default user_router;