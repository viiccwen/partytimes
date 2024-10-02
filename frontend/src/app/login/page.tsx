import { Navbar } from "@/components/customs/navbar";
import { LoginForm } from "@/components/customs/user/login-form";
import { Toaster } from "sonner";
import { Metadata } from "next";
import { Auth } from "@/actions/user-actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage() {
  const token: string | undefined = cookies().get("token")?.value;
  const { correct: auth, data: user, error } = await Auth(token);

  if(auth) redirect("profile");

  return (
    <div className="h-screen">
      <Toaster />
      <Navbar isLogin={auth} HasFixed={false} />
      <div className="flex mt-[150px] justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
}
