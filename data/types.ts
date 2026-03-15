export type BandName = "Wheel" | "The Charley Ramsay Trio";

export interface Show {
  id: number;
  date: string; // YYYY-MM-DD
  venue: string;
  city: string;
  band: BandName;
  time?: string | null; // HH:MM (24-hour)
  venue_url?: string | null;
  ticket_url?: string | null;
}

export interface Band {
  id: string;
  name: string;
  genre: string;
  bio: string;
  website_url?: string | null;
}

export interface GearCategory {
  category: string;
  items: string[];
}

export interface GearRow {
  id: number;
  section: "live" | "studio";
  category: string;
  items: string[];
  sort_order: number;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  featured_image_url?: string | null;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
}
