"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Shield } from "lucide-react";

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        setError("Invalid email or password.");
      } else {
        router.push("/admin");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-espresso/5">
      <div className="page-container max-w-md w-full">
        <div className="mx-auto max-w-sm">
          <div className="flex items-center gap-2 mb-8">
            <Shield className="h-6 w-6 text-gold" />
            <span className="font-display font-semibold text-espresso text-xl tracking-tight">Gingerly Admin</span>
          </div>
          <h1 className="text-2xl font-serif font-semibold text-espresso mb-1">Admin sign in</h1>
          <p className="text-espresso/60 text-sm mb-8">Atelier access only.</p>

          {error && (
            <div className="mb-6 rounded-xl border border-clay/30 bg-clay/10 p-4 text-clay text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <Label>Password</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <Button variant="gold" type="submit" disabled={submitting} className="w-full">
              {submitting ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <p className="mt-8 text-xs text-espresso/50 text-center">
            Default credentials (dev only, no DATABASE_URL):<br />
            admin@gingerly.local / admin123
          </p>
          <p className="mt-4 text-center">
            <Link href="/" className="text-espresso/60 hover:text-gold transition-colors text-sm">← Return to the atelier</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
