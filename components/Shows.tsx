import { shows, type BandName } from "@/data/shows";

const BAND_BADGE: Record<BandName, string> = {
  Wheel:
    "bg-amber-400/10 text-amber-400 ring-1 ring-inset ring-amber-400/20",
  "The Charley Ramsay Trio":
    "bg-sky-400/10 text-sky-400 ring-1 ring-inset ring-sky-400/20",
};

function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Shows() {
  return (
    <section id="shows" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="mb-12 font-heading text-3xl font-bold text-white">Upcoming Shows</h2>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border border-zinc-800 md:block">
        <table className="w-full text-sm">
          <thead className="border-b border-zinc-800 bg-zinc-900/50">
            <tr>
              {["Date", "Venue", "City", "Band"].map((h) => (
                <th
                  key={h}
                  className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {shows.map((show) => (
              <tr key={show.id} className="transition-colors hover:bg-zinc-900/40">
                <td className="whitespace-nowrap px-6 py-4 text-zinc-300">
                  {formatDate(show.date)}
                </td>
                <td className="px-6 py-4 font-medium text-white">{show.venue}</td>
                <td className="px-6 py-4 text-zinc-400">{show.city}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${BAND_BADGE[show.band]}`}
                  >
                    {show.band}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <ul className="flex flex-col gap-4 md:hidden">
        {shows.map((show) => (
          <li
            key={show.id}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
          >
            <p className="mb-1 text-xs text-zinc-500">{formatDate(show.date)}</p>
            <p className="font-semibold text-white">{show.venue}</p>
            <p className="text-sm text-zinc-400">{show.city}</p>
            <span
              className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium ${BAND_BADGE[show.band]}`}
            >
              {show.band}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
