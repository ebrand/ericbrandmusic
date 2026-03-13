"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Show, BandName } from "@/data/types";

const BAND_OPTIONS: BandName[] = ["Wheel", "The Charley Ramsay Trio"];

const EMPTY_SHOW: Omit<Show, "id"> = {
  date: "",
  venue: "",
  city: "",
  band: "Wheel",
  time: "",
  venue_url: "",
  ticket_url: "",
};

export default function ShowsManager({ initialShows }: { initialShows: Show[] }) {
  const [shows, setShows] = useState(initialShows);
  const [editing, setEditing] = useState<Show | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Omit<Show, "id">>(EMPTY_SHOW);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/shows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const newShow = await res.json();
      setShows((prev) => [...prev, newShow]);
      setAdding(false);
      setForm(EMPTY_SHOW);
      router.refresh();
    }
    setLoading(false);
  };

  const handleEdit = async () => {
    if (!editing) return;
    setLoading(true);
    const res = await fetch("/api/admin/shows", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, id: editing.id }),
    });
    if (res.ok) {
      const updated = await res.json();
      setShows((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      setEditing(null);
      setForm(EMPTY_SHOW);
      router.refresh();
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this show?")) return;
    const res = await fetch("/api/admin/shows", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setShows((prev) => prev.filter((s) => s.id !== id));
      router.refresh();
    }
  };

  const startEdit = (show: Show) => {
    setEditing(show);
    setAdding(false);
    setForm({
      date: show.date,
      venue: show.venue,
      city: show.city,
      band: show.band,
      time: show.time ?? "",
      venue_url: show.venue_url ?? "",
      ticket_url: show.ticket_url ?? "",
    });
  };

  const cancel = () => {
    setEditing(null);
    setAdding(false);
    setForm(EMPTY_SHOW);
  };

  const showForm = adding || editing;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-white">Shows</h2>
        {!showForm && (
          <button
            onClick={() => {
              setAdding(true);
              setEditing(null);
              setForm(EMPTY_SHOW);
            }}
            className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-amber-300"
          >
            Add Show
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h3 className="mb-4 text-sm font-semibold text-zinc-300">
            {adding ? "New Show" : "Edit Show"}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs text-zinc-500">Date</span>
              <input
                type="date"
                value={form.date}
                onChange={(e) => updateField("date", e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:border-amber-400 focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-zinc-500">Time (HH:MM)</span>
              <input
                type="time"
                value={form.time ?? ""}
                onChange={(e) => updateField("time", e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:border-amber-400 focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-zinc-500">Venue</span>
              <input
                type="text"
                value={form.venue}
                onChange={(e) => updateField("venue", e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:border-amber-400 focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-zinc-500">City</span>
              <input
                type="text"
                value={form.city}
                onChange={(e) => updateField("city", e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:border-amber-400 focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-zinc-500">Band</span>
              <select
                value={form.band}
                onChange={(e) => updateField("band", e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:border-amber-400 focus:outline-none"
              >
                {BAND_OPTIONS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-zinc-500">Venue URL</span>
              <input
                type="url"
                value={form.venue_url ?? ""}
                onChange={(e) => updateField("venue_url", e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:border-amber-400 focus:outline-none"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-xs text-zinc-500">Ticket URL</span>
              <input
                type="url"
                value={form.ticket_url ?? ""}
                onChange={(e) => updateField("ticket_url", e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:border-amber-400 focus:outline-none"
              />
            </label>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={adding ? handleAdd : handleEdit}
              disabled={loading || !form.date || !form.venue || !form.city}
              className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-amber-300 disabled:opacity-50"
            >
              {loading ? "Saving..." : adding ? "Add" : "Save"}
            </button>
            <button
              onClick={cancel}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Shows table */}
      <div className="overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead className="border-b border-zinc-800 bg-zinc-900/50">
            <tr>
              {["Date", "Time", "Venue", "City", "Band", ""].map((h) => (
                <th
                  key={h || "actions"}
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {shows.map((show) => (
              <tr key={show.id} className="transition-colors hover:bg-zinc-900/40">
                <td className="whitespace-nowrap px-4 py-3 text-zinc-300">{show.date}</td>
                <td className="px-4 py-3 text-zinc-400">{show.time ?? ""}</td>
                <td className="px-4 py-3 font-medium text-white">{show.venue}</td>
                <td className="px-4 py-3 text-zinc-400">{show.city}</td>
                <td className="px-4 py-3 text-zinc-400">{show.band}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => startEdit(show)}
                    className="mr-2 text-xs text-amber-400 hover:text-amber-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(show.id)}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
