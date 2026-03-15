"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@/data/types";

type BlogForm = Omit<BlogPost, "id" | "created_at" | "updated_at">;

const EMPTY_POST: BlogForm = {
  title: "",
  slug: "",
  content: "",
  excerpt: "",
  featured_image_url: "",
  tags: [],
  published: false,
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function BlogManager({
  initialPosts,
}: {
  initialPosts: BlogPost[];
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<BlogForm>(EMPTY_POST);
  const [tagsInput, setTagsInput] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const updateField = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = async () => {
    setLoading(true);
    const payload = { ...form, tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean) };
    const res = await fetch("/api/admin/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const newPost = await res.json();
      setPosts((prev) => [newPost, ...prev]);
      setAdding(false);
      setForm(EMPTY_POST);
      setTagsInput("");
      router.refresh();
    }
    setLoading(false);
  };

  const handleEdit = async () => {
    if (!editing) return;
    setLoading(true);
    const payload = { ...form, id: editing.id, tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean) };
    const res = await fetch("/api/admin/blog", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const updated = await res.json();
      setPosts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      setEditing(null);
      setForm(EMPTY_POST);
      setTagsInput("");
      router.refresh();
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this post?")) return;
    const res = await fetch("/api/admin/blog", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
      router.refresh();
    }
  };

  const startEdit = (post: BlogPost) => {
    setEditing(post);
    setAdding(false);
    setForm({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt ?? "",
      featured_image_url: post.featured_image_url ?? "",
      tags: post.tags,
      published: post.published,
    });
    setTagsInput(post.tags.join(", "));
  };

  const cancel = () => {
    setEditing(null);
    setAdding(false);
    setForm(EMPTY_POST);
    setTagsInput("");
  };

  const showForm = adding || editing;

  const inputClass =
    "w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:border-amber-400 focus:outline-none";

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-white">Blog Posts</h2>
        {!showForm && (
          <button
            onClick={() => {
              setAdding(true);
              setEditing(null);
              setForm(EMPTY_POST);
              setTagsInput("");
            }}
            className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-amber-300"
          >
            New Post
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h3 className="mb-4 text-sm font-semibold text-zinc-300">
            {adding ? "New Post" : "Edit Post"}
          </h3>
          <div className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs text-zinc-500">Title</span>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => {
                    updateField("title", e.target.value);
                    if (adding) updateField("slug", slugify(e.target.value));
                  }}
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-zinc-500">Slug</span>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => updateField("slug", e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-1 block text-xs text-zinc-500">Excerpt</span>
              <input
                type="text"
                value={form.excerpt ?? ""}
                onChange={(e) => updateField("excerpt", e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-zinc-500">
                Content (Markdown)
              </span>
              <textarea
                value={form.content}
                onChange={(e) => updateField("content", e.target.value)}
                rows={12}
                className={inputClass + " font-mono"}
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs text-zinc-500">
                  Featured Image URL
                </span>
                <input
                  type="url"
                  value={form.featured_image_url ?? ""}
                  onChange={(e) => updateField("featured_image_url", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-zinc-500">
                  Tags (comma-separated)
                </span>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="drumming, gear, touring"
                  className={inputClass}
                />
              </label>
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => updateField("published", e.target.checked)}
                className="h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-amber-400 focus:ring-amber-400"
              />
              <span className="text-sm text-zinc-300">Published</span>
            </label>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={adding ? handleAdd : handleEdit}
              disabled={loading || !form.title || !form.slug}
              className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-amber-300 disabled:opacity-50"
            >
              {loading ? "Saving..." : adding ? "Create" : "Save"}
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

      {/* Posts table */}
      <div className="overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead className="border-b border-zinc-800 bg-zinc-900/50">
            <tr>
              {["Title", "Slug", "Tags", "Status", "Date", ""].map((h) => (
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
            {posts.map((post) => (
              <tr key={post.id} className="transition-colors hover:bg-zinc-900/40">
                <td className="px-4 py-3 font-medium text-white">{post.title}</td>
                <td className="px-4 py-3 text-zinc-400">{post.slug}</td>
                <td className="px-4 py-3 text-zinc-400">
                  {post.tags.join(", ")}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                      post.published
                        ? "bg-green-900/40 text-green-400"
                        : "bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-zinc-400">
                  {new Date(post.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => startEdit(post)}
                    className="mr-2 text-xs text-amber-400 hover:text-amber-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
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
