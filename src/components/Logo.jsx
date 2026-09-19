import { images } from "../data/content";

export default function Logo({ tone = "light", className = "" }) {
  const color = tone === "light" ? "text-paper" : "text-charcoal";
  return (
    <span className={`inline-flex select-none items-center gap-2.5 ${className}`}>
      <img
        src={images.emblem}
        alt=""
        className="h-[1.9em] w-[1.9em] shrink-0 rounded-full object-cover"
      />
      <span className={`font-display font-medium tracking-[0.28em] uppercase ${color}`}>
        Arcane 7
      </span>
    </span>
  );
}
