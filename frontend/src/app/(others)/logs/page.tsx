import { Auth } from "@/actions/user-actions";
import { Navbar } from "@/components/customs/navbar";
import { LogsCard } from "@/components/customs/others/logs-card";
import { log_list } from "@/lib/logs";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "logs",
};

export default async function LogsPage() {
  const token: string | undefined = cookies().get("token")?.value;
  const { correct: auth, data: user, error } = await Auth(token);
  return (
    <>
      <Navbar isLogin={auth} HasFixed={true} />
      <LogsCard log_list={log_list} />
    </>
  );
}
