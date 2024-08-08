import { login_schema_type, register_schema_type } from "@/lib/type";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const Cookie = require("js-cookie");


export const Register = async (formdata: register_schema_type) => {
    try {
        const response = await fetch(`${API_URL}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formdata),
        });
        
        if(response.ok) {
            const data = await response.json();
            Cookie.set("token", data.token);

            return { correct: true };
        } else {
            const data = await response.json();
            throw new Error(data.error);
        }
    } catch(error: any) {
        return { correct: false, error: error.message};
    }
}

export const Login = async (formdata: login_schema_type) => {
    try {
        const response = await fetch(`${API_URL}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formdata),
        });
        
        if(response.ok) {
            const data = await response.json();
            Cookie.set("token", data.token);

            return { correct: true };
        } else {
            const data = await response.json();
            throw new Error(data.error);
        }
    } catch(error: any) {
        return { correct: false, error: error.message};
    }
}

export const CheckAuth = async (token: string | undefined) => {
    if(token == undefined) return false;

    const response = await fetch(`${API_URL}/user/check`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
        }
    });

    return response.ok ? true : false;
}

export const CheckNickname = async (token: string | undefined) => {
    if(token == undefined) return false;

    const response = await fetch(`${API_URL}/user/check/nickname`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
        }
    });

    return response.ok ? true : false;
}

export const Logout = () => {
    Cookie.remove("token");
    window.location.href = "/";
}

export const DeleteAccount = async () => {
    try {
        const response = await fetch(`${API_URL}/user/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${Cookie.get("token")}`,
            }
        });
        
        if(response.ok) {
            Cookie.remove("token");
            return { correct: true };
        } else {
            const data = await response.json();
            throw new Error(data.error);
        }
    } catch(error: any) {
        return { correct: false, error: error.message};
    }
}

export const GetUserInfo = async () => {
    try {
        const response = await fetch(`${API_URL}/user/get`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${Cookie.get("token")}`,
            }
        });
        
        if(response.ok) {
            const data = await response.json();
            Cookie.set("id", data.id);
            Cookie.set("name", data.nickname);
            Cookie.set("email", data.email);
            
            return { correct: true };
        } else {
            const data = await response.json();
            throw new Error(data.error);
        }
    } catch(error: any) {
        return { correct: false, error: error.message};
    }
}

export const EditName = async (nickname: string) => {
    try {
        const response = await fetch(`${API_URL}/user/update/name`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${Cookie.get("token")}`,
            },
            body: JSON.stringify({ nickname }),
        });
        
        if(response.ok) {
            const data = await response.json();
            Cookie.set("name", data.nickname);
            
            return { correct: true };
        } else {
            const data = await response.json();
            throw new Error(data.error);
        }
    } catch(error: any) {
        return { correct: false, error: error.message};
    }
}

export const EditEmail = async (email: string) => {
    try {
        const response = await fetch(`${API_URL}/user/update/email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${Cookie.get("token")}`,
            },
            body: JSON.stringify({ email: email }),
        });
        
        if(response.ok) {
            const data = await response.json();
            Cookie.set("email", data.email);
            
            return { correct: true };
        } else {
            const data = await response.json();
            throw new Error(data.error);
        }
    } catch(error: any) {
        return { correct: false, error: error.message};
    }
}