"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GithubOAuthButton, GoogleOAuthButton } from "./oauth-button";

export const LoginForm = () => {
  return (
    <>
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
    </>
  );
};
