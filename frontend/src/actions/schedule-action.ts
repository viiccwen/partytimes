import { decision_schema_type, general_fetch_return_type } from "@/lib/type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const CreateSchedule = async (
  partyid: string,
  timeslot: decision_schema_type
): Promise<general_fetch_return_type> => {
  try {
    const response = await fetch(`${API_URL}/schedule/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ partyid, timeslot }),
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

export const DeleteSchedule = async (
  partyid: string
): Promise<general_fetch_return_type> => {
  try {
    const response = await fetch(`${API_URL}/schedule/delete/${partyid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
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
