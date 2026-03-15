export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getBlogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog | Eric Brand",
  description: "Thoughts on drumming, music, gear, and playing live.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts(true);

  return (
    <div className="min-h-screen text-zinc-100">
      <Nav />
      <main className="mx-auto max-w-4xl px-6 pt-28 pb-16">
        <h1 className="font-heading text-3xl font-bold text-white mb-2">Blog</h1>
        <p className="text-zinc-400 mb-12">
          Thoughts on drumming, music, gear, and playing live.
        </p>

        {posts.length === 0 ? (
          <p className="text-zinc-500">No posts yet. Check back soon.</p>
        ) : (
          <div className="space-y-10">
            {posts.map((post) => (
              <article key={post.id} className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  {post.featured_image_url && (
                    <div className="mb-4 overflow-hidden rounded-xl border border-zinc-800">
                      <img
                        src={post.featured_image_url}
                        alt={post.title}
                        className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-xs text-zinc-500 mb-2">
                    <time dateTime={post.created_at}>
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    {post.tags.length > 0 && (
                      <>
                        <span>&middot;</span>
                        <span>{post.tags.join(", ")}</span>
                      </>
                    )}
                  </div>
                  <h2 className="font-heading text-xl font-bold text-white transition-colors group-hover:text-amber-400">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-2 text-sm text-zinc-400 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
