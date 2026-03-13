import fs from "fs";
import path from "path";
import type { Show, Band, GearCategory } from "@/data/types";

const DATA_DIR = path.join(process.cwd(), "data");

function readJSON<T>(filename: string): T {
  const filePath = path.join(DATA_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

function writeJSON<T>(filename: string, data: T): void {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

export function getShows(): Show[] {
  return readJSON<Show[]>("shows.json");
}

export function writeShows(shows: Show[]): void {
  writeJSON("shows.json", shows);
}

export function getBands(): Band[] {
  return readJSON<Band[]>("bands.json");
}

export function writeBands(bands: Band[]): void {
  writeJSON("bands.json", bands);
}

export function getGear(): { liveGear: GearCategory[]; studioGear: GearCategory[] } {
  return readJSON<{ liveGear: GearCategory[]; studioGear: GearCategory[] }>("gear.json");
}

export function writeGear(gear: { liveGear: GearCategory[]; studioGear: GearCategory[] }): void {
  writeJSON("gear.json", gear);
}
