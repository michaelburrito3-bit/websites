import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { shop } from "../data/content";

const ease = [0.16, 1, 0.3, 1];
const MotionLink = motion(Link);

function CornerMark({ className = "" }) {
  return (
    <svg
      viewBox="0 0 44 44"
      className={`absolute h-6 w-6 text-paper/35 sm:h-8 sm:w-8 ${className}`}
      fill="none"
    >
      <path d="M2 44V12C2 6.477 6.477 2 12 2H44" stroke="currentColor" strokeWidth="1" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-void">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,_#141414_0%,_#070707_55%,_#020202_100%)]" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.06] mix-blend-overlay" preserveAspectRatio="none">
          <filter id="heroGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#heroGrain)" />
        </svg>
      </div>

      <div className="pointer-events-none absolute inset-4 border border-paper/10 sm:inset-7 lg:inset-10">
        <CornerMark className="-left-px -top-px" />
        <CornerMark className="-right-px -top-px rotate-90" />
        <CornerMark className="-right-px -bottom-px rotate-180" />
        <CornerMark className="-left-px -bottom-px -rotate-90" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-28 text-center sm:px-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.15 }}
          className="select-none text-paper"
        >
          <span className="block font-blackletter uppercase text-[3.6rem] leading-[1] tracking-[0.01em] sm:text-8xl sm:leading-[1] lg:text-[8.5rem] lg:leading-[0.95]">
            ARCANE 7
          </span>
          <span className="mt-4 block text-[0.62rem] font-medium tracking-[0.42em] text-paper/80 sm:mt-6 sm:text-sm lg:text-base lg:tracking-[0.55em]">
            SACRAMENTO BARBER STUDIO
          </span>
          <span className="mt-2 block text-[0.6rem] font-light tracking-[0.3em] text-paper/50 sm:text-[0.7rem] lg:text-xs">
            {shop.addressLine1}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.55 }}
          className="mt-8 max-w-xs text-sm font-light leading-relaxed text-bone/60 sm:mt-10"
        >
          Bold color. Sharp fades. Custom design.
        </motion.p>

        <MotionLink
          to="/book"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.75 }}
          className="group mt-10 flex items-center gap-3 text-[0.7rem] tracking-[0.24em] text-paper sm:mt-12"
        >
          <span className="border-b border-paper/50 pb-1 transition-colors duration-300 group-hover:border-paper">
            BOOK AN APPOINTMENT
          </span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
            &rarr;
          </span>
        </MotionLink>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="relative z-10 hidden flex-col items-center gap-2 pb-8 text-paper/50 sm:flex"
      >
        <span className="text-[0.6rem] tracking-[0.3em]">SCROLL</span>
        <span className="h-10 w-px bg-paper/30" />
      </motion.div>
    </section>
  );
}
