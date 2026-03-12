const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Bandcamp", href: "#" },
  { label: "YouTube", href: "#" },
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
                href="mailto:placeholder@email.com"
                className="text-amber-400 transition-colors hover:text-amber-300"
              >
                placeholder@email.com
              </a>
            </p>
          </div>

          <ul className="flex flex-wrap justify-center gap-6 md:justify-end">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="text-sm text-zinc-400 transition-colors hover:text-amber-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-12 text-center text-xs text-zinc-700">
          &copy; {new Date().getFullYear()} Eric Brand. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
