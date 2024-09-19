import { feedback_schema_type } from "@/lib/type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const Cookie = require("js-cookie");

export const SendFeedbackMail = async (formdata: feedback_schema_type) => {
    try {
        const response = await fetch(`${API_URL}/mail/feedback`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formdata)
        });

        if(response.ok) {
            return { correct: true };
        } else {
            const data = await response.json();
            throw new Error(data.error);
        }
    } catch (error: any) {
        return { correct: false, error: error.message };
    }
} 