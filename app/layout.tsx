import type { Metadata } from "next";
import { Geist, Space_Mono } from "next/font/google";
import fs from "fs";
import path from "path";
import "./globals.css";
import Background from "@/components/Background";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function getBackgroundImages(): string[] {
  const dir = path.join(process.cwd(), "public", "backgrounds");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .map((f) => `/backgrounds/${f}`);
}

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Eric Brand | Drummer/Singer",
  description:
    "Drummer for Wheel and The Charley Ramsay Trio. Upcoming gigs, live gear, and studio setup.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${spaceMono.variable} font-sans antialiased bg-zinc-950`}>
        <Background images={getBackgroundImages()} />
        {children}
      </body>
    </html>
  );
}
