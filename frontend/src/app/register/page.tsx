import { Navbar } from "@/components/customs/navbar";
import { RegisterForm } from "@/components/customs/user/register-form";
import { Toaster } from "sonner";

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
