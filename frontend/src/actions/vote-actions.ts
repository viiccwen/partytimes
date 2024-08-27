import {
  general_fetch_return_type,
  get_votetimes_fetch_return_type,
  timeslots_create_schema_type,
} from "@/lib/type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const Cookie = require("js-cookie");

export const CreateVote = async (
  timeslots: timeslots_create_schema_type,
  partyid: string,
): Promise<general_fetch_return_type> => {
  try {
    let token = Cookie.get("token");
    console.log(token);
    let response;
    if (token) {
      response = await fetch(`${API_URL}/vote/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ partyid, timeslots }),
      });
    } else {
      response = await fetch(`${API_URL}/vote/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ partyid, timeslots }),
      });
    }

    if (response.ok) {
      return { correct: true };
    } else {
      const data = await response.json();
      throw new Error(data.error);
    }
  } catch (error: any) {
    return { correct: false, error: error.message };
  }
};

export const GetVoteTimes = async (
  partyid: string
): Promise<get_votetimes_fetch_return_type> => {
  try {
    const response = await fetch(`${API_URL}/vote/get?partyid=${partyid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return { correct: true, data };
    } else {
      const data = await response.json();
      throw new Error(data.error);
    }
  } catch (error: any) {
    return { correct: false, error: error.message };
  }
};
