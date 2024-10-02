import { Auth } from "@/actions/user-actions";
import { Navbar } from "@/components/customs/navbar";
import { FeedbackForm } from "@/components/customs/others/feedback-form";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "feedback",
};

export default async function Feedback() {
  const token: string | undefined = cookies().get("token")?.value;
  const { correct: auth, data: user, error } = await Auth(token);

  return (
    <>
      <Navbar isLogin={auth} HasFixed={true} />
      <Toaster richColors />
      <FeedbackForm />
    </>
  );
}
