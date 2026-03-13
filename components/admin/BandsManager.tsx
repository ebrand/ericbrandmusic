"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Band } from "@/data/types";

const EMPTY_BAND: Omit<Band, "id"> = {
  name: "",
  genre: "",
  bio: "",
  websiteUrl: "",
};

export default function BandsManager({ initialBands }: { initialBands: Band[] }) {
  const [bands, setBands] = useState(initialBands);
  const [editing, setEditing] = useState<Band | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Omit<Band, "id">>(EMPTY_BAND);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/bands", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const newBand = await res.json();
      setBands((prev) => [...prev, newBand]);
      setAdding(false);
      setForm(EMPTY_BAND);
      router.refresh();
    }
    setLoading(false);
  };

  const handleEdit = async () => {
    if (!editing) return;
    setLoading(true);
    const res = await fetch("/api/admin/bands", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, id: editing.id }),
    });
    if (res.ok) {
      const updated = await res.json();
      setBands((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
      setEditing(null);
      setForm(EMPTY_BAND);
      router.refresh();
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this band?")) return;
    const res = await fetch("/api/admin/bands", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setBands((prev) => prev.filter((b) => b.id !== id));
      router.refresh();
    }
  };

  const startEdit = (band: Band) => {
    setEditing(band);
    setAdding(false);
    setForm({
      name: band.name,
      genre: band.genre,
      bio: band.bio,
      websiteUrl: band.websiteUrl ?? "",
    });
  };

  const cancel = () => {
    setEditing(null);
    setAdding(false);
    setForm(EMPTY_BAND);
  };

  const showForm = adding || editing;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-white">Bands</h2>
        {!showForm && (
          <button
            onClick={() => {
              setAdding(true);
              setEditing(null);
              setForm(EMPTY_BAND);
            }}
            className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-amber-300"
          >
            Add Band
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h3 className="mb-4 text-sm font-semibold text-zinc-300">
            {adding ? "New Band" : "Edit Band"}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs text-zinc-500">Name</span>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:border-amber-400 focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-zinc-500">Genre</span>
              <input
                type="text"
                value={form.genre}
                onChange={(e) => updateField("genre", e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:border-amber-400 focus:outline-none"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-xs text-zinc-500">Bio</span>
              <textarea
                value={form.bio}
                onChange={(e) => updateField("bio", e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:border-amber-400 focus:outline-none"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-xs text-zinc-500">Website URL</span>
              <input
                type="url"
                value={form.websiteUrl}
                onChange={(e) => updateField("websiteUrl", e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:border-amber-400 focus:outline-none"
              />
            </label>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={adding ? handleAdd : handleEdit}
              disabled={loading || !form.name || !form.genre}
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

      {/* Bands list */}
      <div className="space-y-4">
        {bands.map((band) => (
          <div
            key={band.id}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                  {band.genre}
                </p>
                <h3 className="mt-1 text-lg font-bold text-white">{band.name}</h3>
                <p className="mt-2 text-sm text-zinc-400">{band.bio}</p>
                {band.websiteUrl && (
                  <a
                    href={band.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs text-amber-400 hover:text-amber-300"
                  >
                    {band.websiteUrl}
                  </a>
                )}
              </div>
              <div className="ml-4 flex shrink-0 gap-2">
                <button
                  onClick={() => startEdit(band)}
                  className="text-xs text-amber-400 hover:text-amber-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(band.id)}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
