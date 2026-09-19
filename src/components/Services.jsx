import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { images, services } from "../data/content";

const rowImages = [images.gallery[2], images.gallery[1], images.gallery[3]];

export default function Services() {
  const [active, setActive] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const handleMove = (e) => {
    const rect = sectionRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section id="services" className="relative bg-void px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mb-12 flex items-end justify-between lg:mb-14">
        <h2 className="font-display text-3xl font-extralight uppercase tracking-[0.02em] text-paper sm:text-4xl lg:text-5xl">
          Services
        </h2>
        <span className="hidden text-right text-[0.62rem] tracking-[0.24em] text-bone/60 sm:block">
          BY APPOINTMENT ONLY
          <br />
          PRICING SET BY BARBER
        </span>
      </div>

      <div
        ref={sectionRef}
        onMouseMove={handleMove}
        onMouseLeave={() => setActive(null)}
        className="relative border-t border-white/15"
      >
        {services.map((s, i) => (
          <Link
            key={s.n}
            to="/#contact"
            onMouseEnter={() => setActive(i)}
            className="group relative flex flex-col gap-2 border-b border-white/15 py-7 transition-colors duration-300 hover:bg-white/[0.03] sm:flex-row sm:items-center sm:gap-8 sm:py-9 lg:py-10"
          >
            <span className="font-display text-sm font-light text-bone/60 sm:w-16">{s.n}</span>

            <span className="font-display text-xl font-light uppercase tracking-[0.02em] text-paper transition-transform duration-500 ease-out sm:flex-1 sm:text-2xl lg:text-3xl lg:group-hover:translate-x-3">
              {s.name}
            </span>

            <span className="max-w-md text-sm font-light leading-relaxed text-bone/60 sm:flex-1">
              {s.desc}
            </span>
          </Link>
        ))}

        <AnimatePresence>
          {active !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ left: pos.x + 28, top: pos.y - 90 }}
              className="pointer-events-none absolute z-20 hidden h-44 w-32 overflow-hidden lg:block"
            >
              <img
                src={rowImages[active]}
                alt=""
                className="h-full w-full object-cover contrast-[1.05] brightness-95"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
