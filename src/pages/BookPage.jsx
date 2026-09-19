import { Link } from "react-router-dom";
import { barbers, shop } from "../data/content";

const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  "2522 J St, Sacramento, CA"
)}&output=embed`;

export default function BookPage() {
  return (
    <main className="min-h-screen bg-void px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[0.68rem] tracking-[0.22em] text-bone/60 transition-colors duration-300 hover:text-paper"
        >
          <span className="inline-block -scale-x-100">&rarr;</span>
          BACK TO SITE
        </Link>

        <h1 className="mt-10 font-display text-[13vw] font-extralight uppercase leading-[0.9] tracking-[0.01em] text-paper sm:text-6xl lg:text-7xl">
          Book With
          <br />
          Arcane 7.
        </h1>
        <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-bone/60">
          Reach out to a barber directly on Instagram to book, or use the map
          below to find us.
        </p>

        <div className="mt-16 border-t border-white/15">
          {barbers.map((b) => (
            <a
              key={b.n}
              href={b.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-6 border-b border-white/15 py-6 transition-colors duration-300 hover:bg-white/[0.03]"
            >
              <span className="flex items-baseline gap-4">
                <span className="font-display text-sm font-light text-bone/50">{b.n}</span>
                <span>
                  <span className="block font-display text-xl font-light uppercase tracking-[0.02em] text-paper transition-transform duration-500 ease-out sm:text-2xl lg:group-hover:translate-x-2">
                    {b.name}
                  </span>
                  <span className="mt-1 block text-[0.6rem] tracking-[0.2em] text-bone/50">
                    {b.title}
                  </span>
                </span>
              </span>

              <span className="flex shrink-0 items-center gap-2 text-[0.68rem] tracking-[0.18em] text-bone/60 transition-colors duration-300 group-hover:text-paper">
                @{b.handle}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  &#8599;
                </span>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="font-display text-lg font-light uppercase tracking-[0.03em] text-paper">
            Find The Shop
          </h2>
          <a
            href={shop.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-[0.7rem] tracking-[0.15em] text-bone/60 transition-colors duration-300 hover:text-paper"
          >
            {shop.addressLine1}, {shop.addressLine2} &rarr;
          </a>

          <div className="mt-6 aspect-[4/3] w-full max-w-sm overflow-hidden border border-white/15 sm:aspect-video">
            <iframe
              title="Arcane 7 Barbershop location"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(1) invert(0.92) contrast(0.9)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
