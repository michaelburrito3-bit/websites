import { images, barbers } from "../data/content";

function InstagramMark({ className = "h-3.5 w-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.3" />
      <circle cx="17.15" cy="6.85" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WorkShot({ src, alt, barber }) {
  return (
    <a
      href={barber.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-[4/5] overflow-hidden bg-charcoal"
      aria-label={`Open @${barber.handle} on Instagram`}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover contrast-[1.05] brightness-[0.95] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-void/80 via-void/0 to-void/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="flex items-center gap-1.5 px-3 pb-3 text-[0.62rem] tracking-[0.16em] text-paper">
          <InstagramMark />
          @{barber.handle}
        </span>
      </div>
    </a>
  );
}

export default function Gallery() {
  return (
    <section id="barbers-work" className="bg-void px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
      <div className="mb-8 lg:mb-10">
        <h2 className="font-display text-[9vw] font-extralight uppercase leading-[0.9] tracking-[0.01em] text-paper sm:text-4xl lg:text-5xl">
          Crafted With Intention.
        </h2>
        <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-bone/60">
          Two shots from every chair — tap through for more on Instagram.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-12">
        {barbers.map((barber, i) => (
          <div key={barber.handle}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <WorkShot src={images.barberWork[i][0]} alt={`${barber.name}, portrait`} barber={barber} />
              <WorkShot src={images.barberWork[i][1]} alt={`${barber.name}, recent work`} barber={barber} />
            </div>

            <a
              href={barber.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-3 flex items-baseline justify-between gap-3"
            >
              <span className="truncate text-sm font-light tracking-[0.02em] text-paper">
                {barber.name}
              </span>
              <span className="flex shrink-0 items-center gap-1.5 text-[0.62rem] tracking-[0.16em] text-bone/55 transition-colors duration-300 group-hover:text-paper">
                <InstagramMark className="h-3 w-3" />
                @{barber.handle}
              </span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
