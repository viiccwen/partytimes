const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

export const GeneratePartyId = () => {
    // only contain english letters and numbers
    const partyid = require('crypto').randomBytes(32).toString('base64');
    // remove special characters
    return partyid.replace(/[^a-zA-Z0-9]/g, '').substr(0,8);
}

export const Verify = async (token: string) => {
    try {
        const payload = await jwt.verify(token, JWT_SECRET);
        return payload;
    } catch (error: any) {
        throw new Error("驗證失敗！");
    }
};