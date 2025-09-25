"use client";
import { clearSession } from "@/actions/auth";
import { useAuth } from "@/lib/stores/useAuth";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { clearUser } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await clearSession();
    clearUser();
    router.push("/login");
  }

  return <button onClick={handleLogout}>Logout</button>;
}
