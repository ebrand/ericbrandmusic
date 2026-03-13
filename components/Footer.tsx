const SOCIAL_LINKS = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Twitter (not X)", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "MySpace", href: "#" },
  { label: "HeresWhatIAteToday", href: "#" },
];

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-zinc-800 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="font-heading text-lg font-bold text-white">Eric Brand</p>
            <p className="mt-1 text-sm text-zinc-400">
              For bookings:{" "}
              <a
                href="mailto:ericbrandmusic@gmail.com"
                className="text-amber-400 transition-colors hover:text-amber-300"
              >
                ericbrandmusic@gmail.com
              </a>
            </p>
          </div>

          <ul className="flex flex-wrap justify-center gap-6 md:justify-end">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.label} className="group relative">
                <a
                  href={s.href}
                  className="text-sm text-zinc-400 line-through transition-colors hover:text-amber-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label}
                </a>
                <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-200 opacity-0 transition-opacity group-hover:opacity-100">
                  Live unpublished.
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-12 text-center text-xs text-zinc-700">
          &copy; {new Date().getFullYear()} Eric Brand. All rights reserved.{" "}
          <a href="/admin" className="text-zinc-800 transition-colors hover:text-zinc-600">
            &middot;
          </a>
        </p>
      </div>
    </footer>
  );
}
