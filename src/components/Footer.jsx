import { Link } from "react-router-dom";
import Logo from "./Logo";
import { shop, barbers } from "../data/content";

const LINKS = [
  { label: "SERVICES", href: "/#services" },
  { label: "BARBERS", href: "/#barbers-work" },
  { label: "ABOUT", href: "/#about" },
  { label: "CONTACT", href: "/#contact" },
];
const owner = barbers[0];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-void px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div>
          <Link to="/" className="inline-block w-fit">
            <Logo tone="light" className="text-[0.7rem]" />
          </Link>
          <p className="mt-6 max-w-[220px] text-sm font-light leading-relaxed text-bone/60">
            Bold color. Sharp fades. Custom design.
          </p>
        </div>

        <nav className="flex flex-col gap-3">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="w-fit text-[0.68rem] tracking-[0.2em] text-bone/60 transition-colors duration-300 hover:text-paper"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-[0.68rem] tracking-[0.15em] text-bone/60">
          <a
            href={shop.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit transition-colors duration-300 hover:text-paper"
          >
            {shop.addressLine1}, {shop.addressLine2}
          </a>
          <a
            href={owner.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit transition-colors duration-300 hover:text-paper"
          >
            @{owner.handle}
          </a>
          <span className="text-bone/60">BY APPOINTMENT</span>
        </div>

        <div className="flex items-start sm:justify-end">
          <Link
            to="/book"
            className="group flex items-center gap-3 text-[0.68rem] tracking-[0.2em] text-paper"
          >
            <span className="border-b border-paper/50 pb-1 transition-colors duration-300 group-hover:border-paper">
              BOOK AN APPOINTMENT
            </span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
              &rarr;
            </span>
          </Link>
        </div>
      </div>

      <div className="mt-16 border-t border-white/10 pt-6 text-[0.6rem] tracking-[0.15em] text-bone/55">
        &copy; {new Date().getFullYear()} {shop.fullName}. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
