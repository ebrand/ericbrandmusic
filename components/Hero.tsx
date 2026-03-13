import EmailSignup from "./EmailSignup";

export default function Hero() {
  return (
    <section className="flex min-h-screen items-center justify-center px-6 pt-16">
      <div className="text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
          Drummer/Singer
        </p>
        <h1 className="mb-4 font-heading text-6xl font-bold tracking-tight text-white sm:text-8xl">
          Eric Brand
        </h1>
        <p className="mb-10 text-xl text-zinc-400">
          Wheel &nbsp;&middot;&nbsp; The Charley Ramsay Trio
        </p>
        <a
          href="#shows"
          className="inline-block rounded-full bg-amber-400 px-8 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-300"
        >
          Upcoming Shows
        </a>
        <EmailSignup />
      </div>
    </section>
  );
}
