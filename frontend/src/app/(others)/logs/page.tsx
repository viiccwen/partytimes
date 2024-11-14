import { VerifyAuth } from "@/lib/verify";
import { Navbar } from "@/components/customs/navbar";
import { LogsCard } from "@/components/customs/others/logs-card";
import { log_list } from "@/lib/logs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "logs",
};

export default async function LogsPage() {
  const { isAuth, user } = await VerifyAuth(false);
  return (
    <>
      <Navbar isLogin={isAuth} HasFixed={false} isLoading={false} />
      <LogsCard log_list={log_list} />
    </>
  );
}
