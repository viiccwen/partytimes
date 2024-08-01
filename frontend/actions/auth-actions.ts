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