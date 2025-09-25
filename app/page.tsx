"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "@/lib/stores/useAuth";
import { useRouter } from "next/navigation";
import { createSession } from "@/actions/auth"; // keep your session creation
import { firebaseAuth } from "@/lib/firebase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const { setUser } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Sign in with Firebase
      const cred = await signInWithEmailAndPassword(firebaseAuth, email, pw);
      const idToken = await cred.user.getIdToken();

      // 2️⃣ Create session cookie
      await createSession(idToken);

      // 3️⃣ Update local Zustand state
      setUser({ uid: cred.user.uid, email: cred.user.email || undefined });

      // 4️⃣ Fetch user role via API
      const res = await fetch("/api/getUserRole");
      const data = await res.json();
      const role = data.role;

      // 5️⃣ Redirect based on role
      if (role === "admin") {
        router.push("/admin/dashboard");
      } else if (role === "user") {
        router.push("/startup/report");
      } else {
        router.push("/"); // fallback
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="flex flex-col gap-1 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="Enter your password"
                required
                className="pr-10" // add padding for the icon
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-gray-400 hover:text-gray-600 right-2 top-7"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <Button type="submit" className="mt-2 w-full" disabled={loading}>
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
