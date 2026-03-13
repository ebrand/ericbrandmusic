"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { GearRow } from "@/data/types";

type Section = "live" | "studio";

export default function GearManager({ initialGearRows }: { initialGearRows: GearRow[] }) {
  const [rows, setRows] = useState(initialGearRows);
  const [activeSection, setActiveSection] = useState<Section>("live");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [catName, setCatName] = useState("");
  const [items, setItems] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const sectionRows = rows.filter((r) => r.section === activeSection);

  const handleAdd = async () => {
    setLoading(true);
    const maxOrder = sectionRows.reduce((max, r) => Math.max(max, r.sort_order), -1);
    const res = await fetch("/api/admin/gear", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        section: activeSection,
        category: catName,
        items: items.split("\n").map((s) => s.trim()).filter(Boolean),
        sort_order: maxOrder + 1,
      }),
    });
    if (res.ok) {
      const newRow = await res.json();
      setRows((prev) => [...prev, newRow]);
      setAdding(false);
      setCatName("");
      setItems("");
      router.refresh();
    }
    setLoading(false);
  };

  const handleEdit = async () => {
    if (editingId === null) return;
    setLoading(true);
    const res = await fetch("/api/admin/gear", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingId,
        category: catName,
        items: items.split("\n").map((s) => s.trim()).filter(Boolean),
      }),
    });
    if (res.ok) {
      const updated = await res.json();
      setRows((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
      setEditingId(null);
      setCatName("");
      setItems("");
      router.refresh();
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this category?")) return;
    const res = await fetch("/api/admin/gear", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setRows((prev) => prev.filter((r) => r.id !== id));
      router.refresh();
    }
  };

  const startEdit = (row: GearRow) => {
    setEditingId(row.id);
    setAdding(false);
    setCatName(row.category);
    setItems(row.items.join("\n"));
  };

  const cancel = () => {
    setEditingId(null);
    setAdding(false);
    setCatName("");
    setItems("");
  };

  const showForm = adding || editingId !== null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-white">Gear</h2>
        {!showForm && (
          <button
            onClick={() => {
              setAdding(true);
              setEditingId(null);
              setCatName("");
              setItems("");
            }}
            className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-amber-300"
          >
            Add Category
          </button>
        )}
      </div>

      {/* Section toggle */}
      <div className="mb-6 flex gap-2">
        {(["live", "studio"] as const).map((section) => (
          <button
            key={section}
            onClick={() => {
              setActiveSection(section);
              cancel();
            }}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeSection === section
                ? "bg-zinc-800 text-white"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {section === "live" ? "Live Gear" : "Studio Gear"}
          </button>
        ))}
      </div>

      {showForm && (
        <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h3 className="mb-4 text-sm font-semibold text-zinc-300">
            {adding ? "New Category" : "Edit Category"}
          </h3>
          <div className="space-y-4">
            <label className="block">
              <span className="mb-1 block text-xs text-zinc-500">Category Name</span>
              <input
                type="text"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:border-amber-400 focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-zinc-500">Items (one per line)</span>
              <textarea
                value={items}
                onChange={(e) => setItems(e.target.value)}
                rows={6}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:border-amber-400 focus:outline-none"
              />
            </label>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={adding ? handleAdd : handleEdit}
              disabled={loading || !catName}
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

      {/* Categories list */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sectionRows.map((row) => (
          <div
            key={row.id}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
          >
            <div className="mb-4 flex items-start justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                {row.category}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(row)}
                  className="text-xs text-amber-400 hover:text-amber-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(row.id)}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
            <ul className="space-y-2">
              {row.items.map((item) => (
                <li key={item} className="text-sm text-zinc-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
