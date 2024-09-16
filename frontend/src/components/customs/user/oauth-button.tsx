"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const GoogleOAuthButton = () => {
  const HandleGoogleOAuth = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="flex gap-2"
      onClick={HandleGoogleOAuth}
    >
      <Image src="/google.png" alt="google" width={20} height={20} />
      Google
    </Button>
  );
};

export const GithubOAuthButton = () => {
  const HandleGithubOAuth = () => {
    window.location.href = `${API_URL}/auth/github`;
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="flex gap-2"
      onClick={HandleGithubOAuth}
    >
      <Image src="/github.png" alt="google" width={20} height={20} />
      Github
    </Button>
  );
};
