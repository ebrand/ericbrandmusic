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
