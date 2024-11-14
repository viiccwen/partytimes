import { Navbar } from "@/components/customs/navbar";
import { LoginForm } from "@/components/customs/user/login-form";
import { Toaster } from "sonner";
import { Metadata } from "next";
import { VerifyAuth } from "@/lib/verify";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage() {
  const { isAuth, user } = await VerifyAuth(false);

  if(isAuth) redirect("profile");

  return (
    <div className="h-screen">
      <Toaster />
      <Navbar isLogin={isAuth} HasFixed={false} isLoading={false} />
      <div className="flex mt-[150px] justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
}
