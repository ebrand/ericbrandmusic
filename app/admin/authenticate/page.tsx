"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStytch } from "@stytch/nextjs";

function AuthenticateInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stytch = useStytch();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");
    const tokenType = searchParams.get("stytch_token_type");

    console.log("[auth] token:", token ? `${token.slice(0, 10)}...` : "null");
    console.log("[auth] tokenType:", tokenType);

    if (!token || tokenType !== "oauth") {
      console.log("[auth] missing token or wrong type, redirecting to login");
      router.replace("/admin/login");
      return;
    }

    stytch.oauth
      .authenticate(token, {
        session_duration_minutes: 60,
      })
      .then((resp) => {
        console.log("[auth] success:", resp);
        router.replace("/admin");
      })
      .catch((err) => {
        console.error("[auth] failed:", err);
        setError(String(err?.message || err));
      });
  }, [router, searchParams, stytch]);

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-400">Authentication failed</p>
        <p className="mt-2 text-xs text-zinc-500">{error}</p>
        <a href="/admin/login" className="mt-4 inline-block text-sm text-amber-400 hover:text-amber-300">
          Try again
        </a>
      </div>
    );
  }

  return <p className="text-zinc-400">Authenticating...</p>;
}

export default function AuthenticatePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <Suspense fallback={<p className="text-zinc-400">Loading...</p>}>
        <AuthenticateInner />
      </Suspense>
    </div>
  );
}
