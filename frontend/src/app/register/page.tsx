import { Navbar } from "@/components/customs/navbar";
import { RegisterForm } from "@/components/customs/user/register-form";
import { Toaster } from "sonner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <>
      <Toaster />
      <Navbar />
      <div className="h-screen flex justify-center items-center">
        <RegisterForm />
      </div>
    </>
  );
}
