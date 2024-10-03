import {
  general_fetch_return_type,
  userinfo_fetch_return_type,
} from "@/lib/type";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const Cookie = require("js-cookie");

export const Auth = async (
  token: string | undefined
): Promise<userinfo_fetch_return_type> => {
  try {
    if (!token) throw new Error("尚未登入或是登入狀況有錯誤！");
    const response = await fetch(`${API_URL}/user`, {
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

export const Logout = (): void => {
  Cookie.remove("token");
  window.location.href = "/";
};

export const DeleteAccount = async (): Promise<general_fetch_return_type> => {
  try {
    const token = Cookie.get("token");
    if (!token) throw new Error("尚未登入或是登入狀況有錯誤！");
    const response = await fetch(`${API_URL}/user/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
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

export const EditName = async (
  nickname: string
): Promise<general_fetch_return_type> => {
  try {
    const token = Cookie.get("token");
    if (!token) throw new Error("尚未登入或是登入狀況有錯誤！");
    const response = await fetch(`${API_URL}/user/update/name`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
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

export const VerifyAuth = cache(async (protected_root: boolean) => {
  const token = cookies().get("token")?.value;
  const { correct: isAuth, data: user, error } = await Auth(token);
  if(!isAuth && user && protected_root) redirect("/login");
  return { isAuth, user };
});
