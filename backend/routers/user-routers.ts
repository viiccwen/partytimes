import { CheckAuth, DeleteAccount, GetUserInfo, Login, Register, UpdateUserEmail, UpdateUserName } from "../controllers/user-controllers";
import { AuthMiddleware } from "../middlewares/auth";


const express = require('express');

const user_router = express.Router();
user_router.post('/login', Login);
user_router.post('/register', Register);
user_router.get('/check', AuthMiddleware, CheckAuth);

user_router.get('/get/user', AuthMiddleware, GetUserInfo);

user_router.post('/delete/account', AuthMiddleware, DeleteAccount);

user_router.post('/update/user/name', AuthMiddleware, UpdateUserName);
user_router.post('/update/user/email', AuthMiddleware, UpdateUserEmail);

export default user_router;