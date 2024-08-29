import { Navbar } from "@/components/customs/navbar";
import { LoginForm } from "@/components/customs/user/login-form";
import { Toaster } from "sonner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <>
      <Toaster />
      <Navbar />
      <div className="h-screen flex justify-center items-center">
        <LoginForm />
      </div>
    </>
  );
}
