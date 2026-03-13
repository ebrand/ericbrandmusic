import { getGear } from "@/lib/data";

export default function Gear() {
  const { liveGear } = getGear();
  return (
    <section id="gear" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="mb-2 font-heading text-3xl font-bold text-white">Gear</h2>
      <p className="mb-12 text-zinc-400">Stuff I hit.</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {liveGear.map((cat) => (
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
    </section>
  );
}
