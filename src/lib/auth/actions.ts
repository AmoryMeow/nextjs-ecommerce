"use server";

import { redirect } from "next/navigation";

import { createSession, deleteSession, isValidAdminPassword } from "./session";

export type LoginState = { error?: string };

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");

  if (!isValidAdminPassword(password)) return { error: "Invalid password" };

  await createSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/login");
}
