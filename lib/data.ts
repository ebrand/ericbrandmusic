import { supabase } from "./supabase";
import type { Show, Band, GearCategory, GearRow, BlogPost } from "@/data/types";

// ── Shows ──────────────────────────────────────────────

export async function getShows(): Promise<Show[]> {
  const { data, error } = await supabase
    .from("shows")
    .select("id, date, time, venue, venue_url, city, band, ticket_url")
    .order("date");
  if (error) throw error;
  return data as Show[];
}

export async function createShow(
  show: Omit<Show, "id">
): Promise<Show> {
  const { data, error } = await supabase
    .from("shows")
    .insert(show)
    .select()
    .single();
  if (error) throw error;
  return data as Show;
}

export async function updateShow(
  id: number,
  fields: Partial<Omit<Show, "id">>
): Promise<Show> {
  const { data, error } = await supabase
    .from("shows")
    .update(fields)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Show;
}

export async function deleteShow(id: number): Promise<void> {
  const { error } = await supabase.from("shows").delete().eq("id", id);
  if (error) throw error;
}

// ── Bands ──────────────────────────────────────────────

export async function getBands(): Promise<Band[]> {
  const { data, error } = await supabase
    .from("bands")
    .select("id, name, genre, bio, website_url");
  if (error) throw error;
  return data as Band[];
}

export async function createBand(band: Band): Promise<Band> {
  const { data, error } = await supabase
    .from("bands")
    .insert(band)
    .select()
    .single();
  if (error) throw error;
  return data as Band;
}

export async function updateBand(
  id: string,
  fields: Partial<Omit<Band, "id">>
): Promise<Band> {
  const { data, error } = await supabase
    .from("bands")
    .update(fields)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Band;
}

export async function deleteBand(id: string): Promise<void> {
  const { error } = await supabase.from("bands").delete().eq("id", id);
  if (error) throw error;
}

// ── Gear ───────────────────────────────────────────────

export async function getGear(): Promise<{
  liveGear: GearCategory[];
  studioGear: GearCategory[];
}> {
  const { data, error } = await supabase
    .from("gear")
    .select("section, category, items")
    .order("sort_order");
  if (error) throw error;

  const rows = data as { section: string; category: string; items: string[] }[];
  const liveGear: GearCategory[] = [];
  const studioGear: GearCategory[] = [];

  for (const row of rows) {
    const cat: GearCategory = { category: row.category, items: row.items };
    if (row.section === "live") liveGear.push(cat);
    else studioGear.push(cat);
  }

  return { liveGear, studioGear };
}

export async function getGearRows(): Promise<GearRow[]> {
  const { data, error } = await supabase
    .from("gear")
    .select("id, section, category, items, sort_order")
    .order("sort_order");
  if (error) throw error;
  return data as GearRow[];
}

export async function createGearRow(
  row: Omit<GearRow, "id">
): Promise<GearRow> {
  const { data, error } = await supabase
    .from("gear")
    .insert(row)
    .select()
    .single();
  if (error) throw error;
  return data as GearRow;
}

export async function updateGearRow(
  id: number,
  fields: Partial<Omit<GearRow, "id">>
): Promise<GearRow> {
  const { data, error } = await supabase
    .from("gear")
    .update(fields)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as GearRow;
}

export async function deleteGearRow(id: number): Promise<void> {
  const { error } = await supabase.from("gear").delete().eq("id", id);
  if (error) throw error;
}

// ── Blog Posts ────────────────────────────────────────

export async function getBlogPosts(publishedOnly = false): Promise<BlogPost[]> {
  let query = supabase
    .from("blog_posts")
    .select("id, title, slug, content, excerpt, featured_image_url, tags, published, created_at, updated_at")
    .order("created_at", { ascending: false });
  if (publishedOnly) {
    query = query.eq("published", true);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data as BlogPost[];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, content, excerpt, featured_image_url, tags, published, created_at, updated_at")
    .eq("slug", slug)
    .single();
  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data as BlogPost;
}

export async function createBlogPost(
  post: Omit<BlogPost, "id" | "created_at" | "updated_at">
): Promise<BlogPost> {
  const { data, error } = await supabase
    .from("blog_posts")
    .insert(post)
    .select()
    .single();
  if (error) throw error;
  return data as BlogPost;
}

export async function updateBlogPost(
  id: number,
  fields: Partial<Omit<BlogPost, "id" | "created_at">>
): Promise<BlogPost> {
  const { data, error } = await supabase
    .from("blog_posts")
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as BlogPost;
}

export async function deleteBlogPost(id: number): Promise<void> {
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw error;
}
