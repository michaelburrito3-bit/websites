import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Logo from "./Logo";
import { images } from "../data/content";

export default function SplitSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section ref={ref} className="grid w-full grid-cols-1 lg:grid-cols-2">
      <div className="flex min-h-[46vh] flex-col justify-between bg-void px-6 py-12 sm:px-10 lg:min-h-[62vh] lg:px-16 lg:py-16">
        <Logo tone="light" className="text-[0.7rem]" />

        <div className="mt-12 max-w-lg lg:mt-0">
          <h2 className="font-display text-[10vw] font-extralight uppercase leading-[0.92] tracking-[0.01em] text-paper sm:text-5xl lg:text-6xl">
            The Art
            <br />
            of the Cut.
          </h2>
          <p className="mt-8 max-w-xs text-sm font-light leading-relaxed text-bone/60">
            Every cut is considered.
            <br />
            Every detail has a purpose.
          </p>
        </div>
      </div>

      <div className="relative aspect-[1128/1900] w-full overflow-hidden bg-void lg:aspect-auto lg:h-[70vh] lg:self-center">
        <motion.img
          style={{ y }}
          src={images.splitRight}
          alt="Swirl hair tattoo linework inside the shop"
          className="h-full w-full object-cover contrast-[1.05] brightness-[0.92] lg:object-contain"
        />
      </div>
    </section>
  );
}
