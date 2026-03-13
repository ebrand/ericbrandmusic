"use client";

import { useState } from "react";
import { useStytch, useStytchSession } from "@stytch/nextjs";
import type { Show, Band, GearRow } from "@/data/types";
import ShowsManager from "./ShowsManager";
import BandsManager from "./BandsManager";
import GearManager from "./GearManager";

const TABS = ["Shows", "Bands", "Gear"] as const;
type Tab = (typeof TABS)[number];

export default function AdminDashboard({
  shows,
  bands,
  gearRows,
}: {
  shows: Show[];
  bands: Band[];
  gearRows: GearRow[];
}) {
  const [activeTab, setActiveTab] = useState<Tab>("Shows");
  const stytch = useStytch();
  const { session } = useStytchSession();

  const handleLogout = async () => {
    await stytch.session.revoke();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="font-heading text-lg font-bold text-white">
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              className="text-sm text-zinc-400 transition-colors hover:text-amber-400"
            >
              View Site
            </a>
            {session && (
              <span className="text-xs text-zinc-500">
                {(() => {
                  const factor = session.authentication_factors?.[0];
                  if (factor && "email_factor" in factor) {
                    return (factor as { email_factor: { email_address: string } }).email_factor.email_address;
                  }
                  return "";
                })()}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-6xl gap-0 px-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "border-amber-400 text-amber-400"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        {activeTab === "Shows" && <ShowsManager initialShows={shows} />}
        {activeTab === "Bands" && <BandsManager initialBands={bands} />}
        {activeTab === "Gear" && <GearManager initialGearRows={gearRows} />}
      </main>
    </div>
  );
}
