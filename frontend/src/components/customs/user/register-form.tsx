"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { register_schema_type } from "@/lib/type";
import { register_schema } from "@/lib/schema";
import { Register } from "@/actions/user-actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const RegisterForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<register_schema_type>({
    resolver: zodResolver(register_schema)
  });

  const onSubmit = async (formdata: register_schema_type) => {
    const response = await Register(formdata);

    if (response.correct) {
        router.push("/profile");
    } else {
      toast.error(response.error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className={cn("w-[350px] md:w-[400px]")}>
          <CardHeader>
            <CardTitle>註冊</CardTitle>
            <CardDescription>註冊都不揪？</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-3">
                <Input placeholder="username" {...register("username")} />
                {errors.username && (
                    <span className="text-red-500 text-sm">{errors.username.message}</span>
                )}
                <Input placeholder="nickname" {...register("nickname")} />
                {errors.nickname && (
                    <span className="text-red-500 text-sm">{errors.nickname.message}</span>
                )}
                <Input
                  type="password"
                  placeholder="password"
                  {...register("password")}
                />
                {errors.password && (
                    <span className="text-red-500 text-sm">{errors.password.message}</span>
                )}
                <Input placeholder="email" {...register("email")} />
                {errors.email && (
                    <span className="text-red-500 text-sm">{errors.email.message}</span>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between mt-8">
            <Button variant="link" asChild>
              <Link href="/login">有帳號了？</Link>
            </Button>
            <Button type="submit">註冊</Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};
