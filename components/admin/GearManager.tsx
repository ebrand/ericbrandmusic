"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { GearCategory } from "@/data/types";

type GearData = { liveGear: GearCategory[]; studioGear: GearCategory[] };
type Section = "liveGear" | "studioGear";

export default function GearManager({ initialGear }: { initialGear: GearData }) {
  const [gear, setGear] = useState(initialGear);
  const [activeSection, setActiveSection] = useState<Section>("liveGear");
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [catName, setCatName] = useState("");
  const [items, setItems] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const categories = gear[activeSection];

  const save = async (updated: GearData) => {
    setLoading(true);
    const res = await fetch("/api/admin/gear", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    if (res.ok) {
      setGear(updated);
      router.refresh();
    }
    setLoading(false);
  };

  const handleAdd = async () => {
    const newCat: GearCategory = {
      category: catName,
      items: items.split("\n").map((s) => s.trim()).filter(Boolean),
    };
    const updated = {
      ...gear,
      [activeSection]: [...categories, newCat],
    };
    await save(updated);
    setAdding(false);
    setCatName("");
    setItems("");
  };

  const handleEdit = async () => {
    if (editingIdx === null) return;
    const newCat: GearCategory = {
      category: catName,
      items: items.split("\n").map((s) => s.trim()).filter(Boolean),
    };
    const newCategories = [...categories];
    newCategories[editingIdx] = newCat;
    const updated = { ...gear, [activeSection]: newCategories };
    await save(updated);
    setEditingIdx(null);
    setCatName("");
    setItems("");
  };

  const handleDelete = async (idx: number) => {
    if (!confirm("Delete this category?")) return;
    const newCategories = categories.filter((_, i) => i !== idx);
    const updated = { ...gear, [activeSection]: newCategories };
    await save(updated);
  };

  const startEdit = (idx: number) => {
    const cat = categories[idx];
    setEditingIdx(idx);
    setAdding(false);
    setCatName(cat.category);
    setItems(cat.items.join("\n"));
  };

  const cancel = () => {
    setEditingIdx(null);
    setAdding(false);
    setCatName("");
    setItems("");
  };

  const showForm = adding || editingIdx !== null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-white">Gear</h2>
        {!showForm && (
          <button
            onClick={() => {
              setAdding(true);
              setEditingIdx(null);
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
        {(["liveGear", "studioGear"] as const).map((section) => (
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
            {section === "liveGear" ? "Live Gear" : "Studio Gear"}
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
        {categories.map((cat, idx) => (
          <div
            key={cat.category}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
          >
            <div className="mb-4 flex items-start justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                {cat.category}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(idx)}
                  className="text-xs text-amber-400 hover:text-amber-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(idx)}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
            <ul className="space-y-2">
              {cat.items.map((item) => (
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
