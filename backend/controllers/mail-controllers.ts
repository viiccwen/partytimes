const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_RECIPIENT,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const SendFeedbackMail = async (req: any, res: any) => {
  try {
    const { name, email, type, title, content } = await req.body;

    if (!email || !type || !title || !content) {
      throw new Error("請填寫所有欄位！");
    }
    
      const message = {
        from: email,
        to: process.env.EMAIL_RECIPIENT,
        subject: `[Partytimes] ${type}: ${title}`,
        text: `Email: ${email}\nName: ${name}\nContent:\n${content}`,
      };

    await transporter.sendMail(message).catch((error: any) => {
      throw new Error(error);
    });

    res.sendStatus(200);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
