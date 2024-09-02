"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { login_schema_type } from "@/lib/type";
import { login_schema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Login } from "@/actions/user-actions";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { GithubOAuthButton, GoogleOAuthButton } from "./oauth-button";

export const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<login_schema_type>({
    resolver: zodResolver(login_schema),
  });

  const onSubmit = async (formdata: login_schema_type) => {
    const response = await Login(formdata);

    if (response.correct) {
      router.push("/profile");
    } else {
      toast.error(response.error);
    }
  };

  return (
    <>
      <Card className={cn("w-[350px] md:w-[400px]")}>
        <CardHeader>
          <CardTitle>登入</CardTitle>
          <CardDescription>登入都不揪？</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4 mt-5">
              <div className="flex flex-col gap-8">
                <Input placeholder="username" {...register("username")} />
                {errors.username && (
                  <span className="text-red-500 text-sm">
                    {errors.username.message}
                  </span>
                )}
                <Input
                  type="password"
                  placeholder="password"
                  {...register("password")}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center mt-10">
              <Button variant="link" asChild>
                <Link href="/register">還沒有帳號？</Link>
              </Button>
              <Button type="submit">登入</Button>
            </div>
          </form>
          <Separator className="mt-5" />
          <div className="flex flex-col gap-4 mt-5">
            <GoogleOAuthButton />
            <GithubOAuthButton />
          </div>
        </CardContent>
      </Card>
    </>
  );
};
