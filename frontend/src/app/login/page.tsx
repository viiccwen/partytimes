import { Navbar } from "@/components/customs/navbar";
import { LoginForm } from "@/components/customs/user/login-form";
import { Toaster } from "sonner";
import { Metadata } from "next";
import { CheckAuth } from "@/actions/user-actions";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage() {
  const cookie = cookies();
  const token: string | undefined = cookie.get("token")?.value
    ? cookie.get("token")?.value
    : undefined;

  const isLogin = await CheckAuth(token);

  return (
    <div className="h-screen">
      <Toaster />
      <Navbar isLogin={isLogin} HasFixed={false} />
      <div className="flex mt-[150px] justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
}
