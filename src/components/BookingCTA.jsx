import { Link } from "react-router-dom";
import { shop } from "../data/content";

export default function BookingCTA() {
  return (
    <section id="contact" className="flex min-h-[42vh] flex-col items-center justify-center bg-void px-6 py-16 text-center">
      <h2 className="font-display text-[11vw] font-extralight uppercase leading-[0.88] tracking-[0.01em] text-paper sm:text-6xl lg:text-7xl">
        Your Chair
        <br />
        Is Waiting.
      </h2>
      <p className="mt-8 text-sm font-light tracking-[0.05em] text-bone/65">
        {shop.addressLine1}, {shop.addressLine2}
      </p>
      <Link
        to="/book"
        className="group mt-12 flex items-center gap-3 text-[0.72rem] tracking-[0.24em] text-paper"
      >
        <span className="border-b border-paper/50 pb-1 transition-colors duration-300 group-hover:border-paper">
          BOOK AN APPOINTMENT
        </span>
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
          &rarr;
        </span>
      </Link>

      <a
        href={shop.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 text-[0.68rem] tracking-[0.2em] text-bone/50 transition-colors duration-300 hover:text-paper"
      >
        @{shop.instagramHandle}
      </a>
    </section>
  );
}
