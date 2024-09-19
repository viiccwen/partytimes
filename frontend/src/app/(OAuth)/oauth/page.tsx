import { OAuthComponent } from "@/components/customs/oauth/oauth-component";
import { Suspense } from "react";

export default function OAuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OAuthComponent />
    </Suspense>
  );
}
