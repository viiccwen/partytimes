import { CheckAuth } from "@/actions/user-actions";
import { Navbar } from "@/components/customs/navbar";
import { LogsCard } from "@/components/customs/others/logs-card";
import { log_list } from "@/lib/logs";
import { cookies } from "next/headers";

export default async function LogsPage() {
  const cookie = cookies();
  const token: string | undefined = cookie.get("token")?.value
    ? cookie.get("token")?.value
    : undefined;
  const isLogin = await CheckAuth(token);

  return (
    <>
      <Navbar isLogin={isLogin} HasFixed={true} />
      <LogsCard log_list={log_list} />
    </>
  );
}
