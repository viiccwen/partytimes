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
import { Button } from "../ui/button";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { Register } from "../../../actions/auth-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { register_schema_type } from "@/lib/type";
import { register_schema } from "@/lib/schema";

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
    console.log(formdata);
    const response = await Register(formdata);

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
          <CardFooter className="flex justify-between">
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
