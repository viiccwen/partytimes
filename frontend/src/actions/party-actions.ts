const API_URL = process.env.NEXT_PUBLIC_API_URL;
const Cookie = require("js-cookie");

// todo: add types
export const CreateParty = async (formdata: any) => {
  const token = Cookie.get("token");
  try {
    const response = await fetch(`${API_URL}/party/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formdata),
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

export const GetParty = async (partyid: string) => {
  try {
    const response = await fetch(`${API_URL}/party/get?partyid=${partyid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(response.ok) {
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

export const GetPartyList = async () => {
  try {
    const token = Cookie.get("token");
    const response = await fetch(`${API_URL}/party/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
    });

    if(response.ok) {
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