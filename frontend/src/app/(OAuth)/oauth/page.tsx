"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const cookies = require("js-cookie");

export default function OAuthSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const error = searchParams.get("error");

  useEffect(() => {
    if (token) {
      cookies.set("token", token);
      router.push("/profile");
    }
    if (error) {
      router.push("/login");
    }
  }, [token, router, error]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="p-5">
        <CardHeader>
          <CardTitle>{token ? "OAuth Success" : "OAuth Error"}</CardTitle>
        </CardHeader>
        <CardContent className="mt-5">
          {token && (
            <div>
              <p>waiting for redirecting...</p>
            </div>
          )}
          {error && <div className="text-red-500 text-center">some mistakes...</div>}
        </CardContent>
      </Card>
    </div>
  );
}
