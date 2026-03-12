import { studioGear } from "@/data/gear";

export default function StudioGear() {
  return (
    <section id="studio" className="bg-zinc-900/30 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-2 font-heading text-3xl font-bold text-white">Studio Gear</h2>
        <p className="mb-12 text-zinc-400">The tools behind the recordings.</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {studioGear.map((cat) => (
            <div
              key={cat.category}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-amber-400">
                {cat.category}
              </h3>
              <ul className="space-y-2">
                {cat.items.map((item) => (
                  <li key={item} className="text-sm text-zinc-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
