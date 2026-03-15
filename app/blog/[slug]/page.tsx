export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BlogContent from "@/components/BlogContent";
import { getBlogPostBySlug } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post || !post.published) return { title: "Not Found" };
  return {
    title: `${post.title} | Eric Brand`,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <div className="min-h-screen text-zinc-100">
      <Nav />
      <main className="mx-auto max-w-3xl px-6 pt-28 pb-16">
        <Link
          href="/blog"
          className="mb-8 inline-block text-sm text-zinc-500 transition-colors hover:text-amber-400"
        >
          &larr; Back to blog
        </Link>

        {post.featured_image_url && (
          <div className="mb-8 overflow-hidden rounded-xl border border-zinc-800">
            <img
              src={post.featured_image_url}
              alt={post.title}
              className="w-full h-72 object-cover"
            />
          </div>
        )}

        <div className="flex items-center gap-3 text-xs text-zinc-500 mb-4">
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

        <h1 className="font-heading text-3xl font-bold text-white mb-8">
          {post.title}
        </h1>

        <BlogContent content={post.content} />
      </main>
      <Footer />
    </div>
  );
}
