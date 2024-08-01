import { CheckAuth, DeleteAccount, GetUserInfo, Login, Register } from "../controllers/auth-controllers";
import { AuthMiddleware } from "../middlewares/auth";


const express = require('express');

const user_router = express.Router();
user_router.post('/login', Login);
user_router.post('/register', Register);
user_router.get('/check', AuthMiddleware, CheckAuth);

user_router.get('/get/user', AuthMiddleware, GetUserInfo);

user_router.post('/delete/account', AuthMiddleware, DeleteAccount);

export default user_router;