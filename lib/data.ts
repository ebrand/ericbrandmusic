import { supabase } from "./supabase";
import type { Show, Band, GearCategory, GearRow } from "@/data/types";

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
