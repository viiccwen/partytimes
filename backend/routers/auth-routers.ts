import { Login, Register } from "../controllers/auth-controllers";


const express = require('express');

const auth_router = express.Router();
auth_router.post('/login', Login);
auth_router.post('/register', Register);
// auth_router.get('/islogin', isAuth, isLogin);

export default auth_router;