import { CheckAuth } from "@/actions/user-actions";
import { Navbar } from "@/components/customs/navbar";
import { FeedbackForm } from "@/components/customs/others/feedback-form";
import { cookies } from "next/headers";
import { Toaster } from "sonner";

export default async function Feedback() {
  const cookie = cookies();
  const token = cookie.get("token")?.value ? cookie.get("token")?.value : undefined;
  const auth = await CheckAuth(token);

  return (
    <>
      <Navbar isLogin={auth} HasFixed={true} />
      <Toaster richColors />
      <FeedbackForm />
    </>
  );
}
