import { useState } from "react";

export default function BeforeAfterSlider({
  before,
  after,
  beforeAlt = "Before",
  afterAlt = "After",
  className = "",
}) {
  const [pos, setPos] = useState(50);

  return (
    <div className={`group relative select-none overflow-hidden bg-ash ${className}`}>
      <img
        src={after}
        alt={afterAlt}
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover contrast-[1.05] brightness-[0.95]"
      />
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={before}
          alt={beforeAlt}
          draggable={false}
          className="h-full w-full object-cover contrast-[1.05] brightness-[0.95]"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-px bg-paper/80"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-paper/80 bg-void/70 text-paper backdrop-blur-sm">
          <span className="text-xs tracking-[-0.05em]">&#8596;</span>
        </div>
      </div>

      <span className="pointer-events-none absolute left-3 top-3 z-10 bg-void/50 px-2 py-1 text-[0.6rem] tracking-[0.2em] text-paper/85">
        BEFORE
      </span>
      <span className="pointer-events-none absolute right-3 top-3 z-10 bg-void/50 px-2 py-1 text-[0.6rem] tracking-[0.2em] text-paper/85">
        AFTER
      </span>

      <input
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Drag to compare before and after"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
