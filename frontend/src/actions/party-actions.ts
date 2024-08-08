import { party_edit_schema_type } from "@/lib/type";
import { revalidatePath } from "next/cache";

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

    if (response.ok) {
      const data = await response.json();
      revalidatePath(`/party/${partyid}`);
      
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
        authorization: `Bearer ${token}`,
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

export const DeleteParty = async (partyid: string) => {
  try {
    const token = Cookie.get("token");
    const response = await fetch(`${API_URL}/party/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ partyid }),
    });

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

export const UpdateParty = async (formdata: party_edit_schema_type, partyid: string) => {
  const token = Cookie.get("token");
  try {
    const response = await fetch(`${API_URL}/party/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({...formdata, partyid}),
    });

    if (response.ok) {
      return { correct: true };
    } else {
      const data = await response.json();
      throw new Error(data.error);
    }
  } catch (error: any) {
    return { correct: false, error: error.message };
  }
}