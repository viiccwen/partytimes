"use client";
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
  }, [token, router]);

  return (
    <>
        {token && <div>OAuth Success</div>}
        {error && <div>OAuth Error: {error}</div>}
    </>
  )
}
