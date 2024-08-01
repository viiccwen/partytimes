"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { login_schema_type } from "@/lib/type";
import { login_schema } from "@/lib/schema";
import { Login } from "../../../actions/auth-actions";

export const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<login_schema_type>({
    resolver: zodResolver(login_schema)
  });

  const onSubmit = async (formdata: login_schema_type) => {
    const response = await Login(formdata);

    if (response.correct) {
        router.push("/");
    } else {
      toast.error(response.error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>登入</CardTitle>
            <CardDescription>登入都不揪？</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-3">
                <Input placeholder="username" {...register("username")} />
                {errors.username && (
                    <span className="text-red-500 text-sm">{errors.username.message}</span>
                )}
                <Input
                  type="password"
                  placeholder="password"
                  {...register("password")}
                />
                {errors.password && (
                    <span className="text-red-500 text-sm">{errors.password.message}</span>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="link" asChild>
              <Link href="/login">還沒有帳號？</Link>
            </Button>
            <Button type="submit">登入</Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};
