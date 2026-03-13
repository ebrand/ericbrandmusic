"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setEmail("");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <p className="mt-6 text-sm font-semibold text-amber-400">
        You&apos;re in! Check your inbox.
      </p>
    );
  }

  return (
    <div className="mt-8">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
        Stay in the loop
      </p>
      <form onSubmit={handleSubmit} className="flex items-center justify-center gap-2">
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-full bg-zinc-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-600 disabled:opacity-50"
        >
          {status === "loading" ? "..." : "Sign Up"}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-sm text-red-400">{errorMsg}</p>
      )}
    </div>
  );
}
