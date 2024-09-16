import {
  general_fetch_return_type,
  userinfo_fetch_return_type,
} from "@/lib/type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const Cookie = require("js-cookie");

export const CheckAuth = async (
  token: string | undefined
): Promise<boolean> => {
  if (token == undefined) return false;

  const response = await fetch(`${API_URL}/user/check`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  return response.ok ? true : false;
};

export const Logout = (): void => {
  Cookie.remove("token");
  window.location.href = "/";
};

export const DeleteAccount = async (): Promise<general_fetch_return_type> => {
  try {
    const response = await fetch(`${API_URL}/user/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookie.get("token")}`,
      },
    });

    if (response.ok) {
      Cookie.remove("token");
      return { correct: true };
    } else {
      const data = await response.json();
      throw new Error(data.error);
    }
  } catch (error: any) {
    return { correct: false, error: error.message };
  }
};

export const GetUserInfo = async (
  token: string | undefined
): Promise<userinfo_fetch_return_type> => {
  try {
    if (token == undefined) throw new Error("Token is not found");

    const response = await fetch(`${API_URL}/user/get`, {
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

export const EditName = async (nickname: string): Promise<general_fetch_return_type>  => {
  try {
    const response = await fetch(`${API_URL}/user/update/name`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookie.get("token")}`,
      },
      body: JSON.stringify({ nickname }),
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