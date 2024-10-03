import { VerifyAuth } from "@/actions/user-actions";
import { Navbar } from "@/components/customs/navbar";
import { FeedbackForm } from "@/components/customs/others/feedback-form";
import { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "feedback",
};

export default async function Feedback() {
  const { isAuth, user } = await VerifyAuth(false);
  return (
    <>
      <Navbar isLogin={isAuth} HasFixed={true} />
      <Toaster richColors />
      <FeedbackForm />
    </>
  );
}
