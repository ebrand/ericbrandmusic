export type BandName = "Wheel" | "The Charley Ramsay Trio";

export interface Show {
  id: string;
  date: string; // YYYY-MM-DD
  venue: string;
  city: string;
  band: BandName;
  ticketUrl?: string;
}

export const shows: Show[] = [
  {
    id: "1",
    date: "2026-04-11",
    venue: "The Hole in the Wall",
    city: "Austin, TX",
    band: "Wheel",
  },
  {
    id: "2",
    date: "2026-03-14",
    venue: "Wake the Dead Coffee House",
    city: "San Marcos, TX",
    band: "The Charley Ramsay Trio",
  },
  {
    id: "3",
    date: "2026-03-22",
    venue: "Sanza Maeso Tasting Room and Bar",
    city: "San Marcos, TX",
    band: "The Charley Ramsay Trio",
  },
  {
    id: "4",
    date: "2026-04-11",
    venue: "Continental Club",
    city: "Austin, TX",
    band: "The Charley Ramsay Trio",
  },
  {
    id: "5",
    date: "2026-04-25",
    venue: "Old Pal Texas Tavern",
    city: "Lockhart, TX",
    band: "The Charley Ramsay Trio",
  },
  {
    id: "6",
    date: "2026-05-02",
    venue: "Trailhead",
    city: "Kerville, TX",
    band: "The Charley Ramsay Trio",
  },
  {
    id: "7",
    date: "2026-05-09",
    venue: "Old Pal Texas Tavern",
    city: "Lockhart, TX",
    band: "The Charley Ramsay Trio",
  },
  {
    id: "8",
    date: "2026-08-13",
    venue: "Old Pal Texas Tavern",
    city: "Lockhart, TX",
    band: "The Charley Ramsay Trio",
  },
];
