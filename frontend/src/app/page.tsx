import { CheckAuth } from "@/actions/user-actions";
import { Navbar } from "@/components/customs/navbar";
import { cookies } from "next/headers";

export default async function Home() {
  const cookie = cookies();
  const token: string | undefined = cookie.get("token")?.value
    ? cookie.get("token")?.value
    : undefined;
  const isLogin = await CheckAuth(token);
  return (
    <>
      <Navbar isLogin={isLogin} />
      <div className="h-screen flex justify-center items-center">
        <h1>Home</h1>
      </div>
    </>
  );
}
