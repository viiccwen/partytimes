import { Metadata } from "next";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navbar } from "@/components/customs/navbar";

import { Toaster } from "sonner";

import { cn } from "@/lib/utils";
import { GithubOAuthButton, GoogleOAuthButton } from "@/components/customs/user/oauth-button";
import { VerifyAuth } from "@/lib/verify";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage() {
  const { isAuth, user } = await VerifyAuth(false);

  if (isAuth) redirect("profile");

  return (
    <div className="h-screen">
      <Toaster />
      <Navbar isLogin={isAuth} HasFixed={false} isLoading={false} />
      <div className="flex mt-[150px] justify-center items-center">
        <Card className={cn("w-[350px] md:w-[400px]")}>
          <CardHeader>
            <CardTitle>登入</CardTitle>
            <CardDescription>登入都不揪？</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 mt-5">
              <GoogleOAuthButton />
              <GithubOAuthButton />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
