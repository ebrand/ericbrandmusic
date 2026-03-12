import { bands } from "@/data/bands";

export default function Bands() {
  return (
    <section id="bands" className="bg-zinc-900/30 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-12 font-heading text-3xl font-bold text-white">Bands</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {bands.map((band) => (
            <div
              key={band.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-8"
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-amber-400">
                {band.genre}
              </p>
              <h3 className="mb-4 font-heading text-2xl font-bold text-white">{band.name}</h3>
              <p className="leading-relaxed text-zinc-400">{band.bio}</p>
              {band.websiteUrl && (
                <a
                  href={band.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block text-sm text-amber-400 transition-colors hover:text-amber-300"
                >
                  Visit site &rarr;
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
