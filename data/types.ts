export type BandName = "Wheel" | "The Charley Ramsay Trio";

export interface Show {
  id: string;
  date: string; // YYYY-MM-DD
  venue: string;
  city: string;
  band: BandName;
  time?: string; // HH:MM (24-hour)
  venueUrl?: string;
  ticketUrl?: string;
}

export interface Band {
  id: string;
  name: string;
  genre: string;
  bio: string;
  websiteUrl?: string;
}

export interface GearCategory {
  category: string;
  items: string[];
}
