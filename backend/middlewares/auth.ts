import { prisma } from "..";

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

export const AuthMiddleware = async (req: any, res: any, next: any) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
        return res.status(401).json({message: "Not authorized"});
    }

    try {
        const decoded: any = await new Promise((resolve, reject) => {
            jwt.verify(token, JWT_SECRET, (err: any, payload: any) => {
                err ? reject(err) : resolve(payload)
            })
        });
        const currentUser = await prisma.user.findFirst({
            where: {
                id: decoded.id
            }
        });
        req.user = currentUser;
        next();
        
    } catch (error) {
        return res.status(401).json({message: "Not authorized"});
    }
};