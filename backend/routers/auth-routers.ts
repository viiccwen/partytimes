import { CheckAuth, Login, Register } from "../controllers/auth-controllers";
import { AuthMiddleware } from "../middlewares/auth";


const express = require('express');

const auth_router = express.Router();
auth_router.post('/login', Login);
auth_router.post('/register', Register);
auth_router.get('/check', AuthMiddleware, CheckAuth);

export default auth_router;