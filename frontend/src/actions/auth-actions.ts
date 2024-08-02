import { login_schema_type, register_schema_type } from "@/lib/type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const Cookie = require("js-cookie");


export const Register = async (formdata: register_schema_type) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
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
        const response = await fetch(`${API_URL}/login`, {
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

export const CheckAuth = async (token: string) => {
    const response = await fetch(`${API_URL}/check`, {
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
        const response = await fetch(`${API_URL}/delete/account`, {
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
        const response = await fetch(`${API_URL}/get/user`, {
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

export const EditName = async (name: string) => {
    try {
        const response = await fetch(`${API_URL}/update/user/name`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${Cookie.get("token")}`,
            },
            body: JSON.stringify({ nickname: name }),
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
        const response = await fetch(`${API_URL}/update/user/email`, {
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