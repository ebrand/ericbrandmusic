export const dynamic = "force-dynamic";

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Shows from "@/components/Shows";
import Bands from "@/components/Bands";
import Gear from "@/components/Gear";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen text-zinc-100">
      <Nav />
      <main>
        <Hero />
        <Shows />
        <Bands />
        <Gear />\
      </main>
      <Footer />
    </div>
  );
}
