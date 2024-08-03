
export const GeneratePartyId = () => {
    // only contain english letters and numbers
    const partyid = require('crypto').randomBytes(32).toString('base64');
    // remove special characters
    return partyid.replace(/[^a-zA-Z0-9]/g, '').substr(0,8);
}