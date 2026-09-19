import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const LINKS = [
  { label: "SERVICES", href: "/#services" },
  { label: "BARBERS", href: "/#barbers-work" },
  { label: "ABOUT", href: "/#about" },
  { label: "CONTACT", href: "/#contact" },
];

const iconTransition = { duration: 0.3, ease: [0.16, 1, 0.3, 1] };

function MenuIcon({ open }) {
  return (
    <span className="relative block h-[11px] w-[22px] shrink-0">
      <motion.span
        className="absolute inset-x-0 top-0 h-px bg-current"
        animate={open ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }}
        transition={iconTransition}
      />
      <motion.span
        className="absolute inset-x-0 bottom-0 h-px bg-current"
        animate={open ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }}
        transition={iconTransition}
      />
    </span>
  );
}

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
          solid ? "bg-void/95 backdrop-blur-sm border-b border-white/10" : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1800px] items-center justify-between px-6 py-5 sm:px-10 lg:px-16">
          <Link to="/" className="relative z-10">
            <Logo tone="light" className="text-[0.72rem] sm:text-sm" />
          </Link>

          <nav className="hidden items-center gap-10 lg:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="text-[0.68rem] tracking-[0.22em] text-bone/80 transition-colors duration-300 hover:text-paper"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link
            to="/book"
            className="hidden border border-paper/70 px-5 py-2.5 text-[0.68rem] tracking-[0.22em] text-paper transition-colors duration-300 hover:bg-paper hover:text-void lg:inline-block"
          >
            BOOK NOW
          </Link>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="relative z-10 text-paper lg:hidden"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-void px-8"
          >
            <nav className="flex flex-col gap-7">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className="text-3xl font-light tracking-[0.12em] text-paper"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <Link
              to="/book"
              onClick={() => setOpen(false)}
              className="mt-12 inline-block w-fit border border-paper/70 px-6 py-3 text-[0.68rem] tracking-[0.22em] text-paper"
            >
              BOOK NOW
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
