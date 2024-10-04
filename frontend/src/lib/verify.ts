'use server';
import { Auth } from "@/actions/user-actions";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const VerifyAuth = async (protected_root: boolean) => {
  const token = cookies().get("token")?.value;
  const { correct: isAuth, data: user, error } = await Auth(token);
  if (!isAuth && user && protected_root) redirect("/login");
  return { isAuth, user };
};
