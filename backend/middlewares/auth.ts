import { prisma } from "../app";
import { Verify } from "../utils/utils";

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

export const AuthMiddleware = async (req: any, res: any, next: any) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
        return res.status(401).json({message: "未授權！"});
    }

    try {
        const decoded: any = await Verify(token);

        const currentUser = await prisma.user.findFirst({
            where: {
                id: decoded.id
            }
        });
        req.user = currentUser;
        next();
        
    } catch (error) {
        return res.status(401).json({message: "未授權！"});
    }
};