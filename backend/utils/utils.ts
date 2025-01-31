import { randomBytes } from "crypto";
import { findParty } from "./party";

export const GeneratePartyId = async () => {
  let partyid = "";
  let isExist = true;

  while (isExist) {
    // only contain english letters and numbers
    partyid = randomBytes(32)
      .toString("base64")
      .replace(/[^a-zA-Z0-9]/g, "")
      .substring(0, 8);
    isExist = await findParty(partyid) ? true : false;
  }

  return partyid;
};
