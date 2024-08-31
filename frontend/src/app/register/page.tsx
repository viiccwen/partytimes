import { Navbar } from "@/components/customs/navbar";
import { RegisterForm } from "@/components/customs/user/register-form";
import { Toaster } from "sonner";
import { Metadata } from "next";
import { CheckAuth } from "@/actions/user-actions";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Register",
};

export default async function RegisterPage() {
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
        <RegisterForm />
      </div>
    </div>
  );
}
