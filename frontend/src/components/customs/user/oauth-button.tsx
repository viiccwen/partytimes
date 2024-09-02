import { Button } from "@/components/ui/button";
import Image from "next/image";

export const GoogleOAuthButton = () => {
  return (
    <Button
      variant="outline"
      className="flex gap-2"
      type="button"
      onClick={() => {
        // debug
        console.log("Google OAuth Button Clicked");
      }}
    >
      <Image src="/google.png" alt="google" width={20} height={20} />
      Google
    </Button>
  );
};

export const GithubOAuthButton = () => {
  return (
    <Button
      variant="outline"
      className="flex gap-2"
      type="button"
      onClick={() => {
        // debug
        console.log("Github OAuth Button Clicked");
      }}
    >
      <Image src="/github.png" alt="google" width={20} height={20} />
      Github
    </Button>
  );
};
