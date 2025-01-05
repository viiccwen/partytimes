import { google } from "googleapis";
import { prisma } from "../app";
import { refreshAccessToken } from "../middlewares/auth";

export const getCalendarEvents = async (req: any, res: any) => {
  try {
    const user = await req.user;
    const { amount } = await req.params;

    if (!user.accessToken && !user.refreshToken)
      throw new Error("未連結 Google 日曆！");

    const oauth2Client = new google.auth.OAuth2(
      process.env.AUTH_GOOGLE_ID,
      process.env.AUTH_GOOGLE_SECRET,
      `${process.env.AUTH_REDIRECT_URL}/api/auth/callback/google`
    );

    oauth2Client.setCredentials({
      access_token: user.accessToken,
      refresh_token: user.refreshToken,
    });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    // get lists
    const events = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(), // event after now
      maxResults: amount,
      singleEvents: true,
      orderBy: "startTime",
    });

    res.status(200).json(events.data.items);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createCalendarEvent = async (req: any, res: any) => {
  try {
    const { refresh_token, summary, description, start, end, invited_lists, partyid } =
      await req.body;

    if (!summary || !start || !end) throw new Error("請填寫所有欄位！");

    if (
      !Array.isArray(invited_lists) ||
      !invited_lists.every((email) => typeof email === "string")
    ) {
      throw new Error("邀請名單有誤！");
    }

    // refresh token
    const oauth2Client = await refreshAccessToken(refresh_token);

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const attendees = invited_lists.map((email) => ({ email }));

    const event = {
      summary, // title
      description,
      start: {
        dateTime: start,
        timeZone: "Asia/Taipei",
      },
      end: {
        dateTime: end,
        timeZone: "Asia/Taipei",
      },
      attendees,
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    });

    if (!response.data.id) throw new Error("新增日曆失敗！");

    const update_eventId = await prisma.decision.update({
      where: { partyid },
      data: { eventId: response.data.id },
    });

    if (!update_eventId) throw new Error("更新日曆失敗！");

    res.status(200).json({ message: "新增成功！" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCalendarEvent = async (req: any, res: any) => {
  try {
    const user = await req.user;
    const { eventId, refresh_token } = await req.body;

    if (!eventId) {
      throw new Error("請填寫活動編號！");
    }

    // refresh token
    const oauth2Client = await refreshAccessToken(refresh_token);

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const del_event = await calendar.events.delete({
      calendarId: "primary",
      eventId,
    });

    if (!del_event) {
      throw new Error("刪除活動失敗！");
    }

    res.status(200).json({ message: "刪除成功！" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
