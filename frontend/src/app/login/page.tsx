import { Navbar } from "@/components/customs/navbar";
import { LoginForm } from "@/components/customs/login-form";
import { Toaster } from "sonner";

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
