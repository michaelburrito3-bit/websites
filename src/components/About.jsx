import { images } from "../data/content";

export default function About() {
  return (
    <section id="about" className="bg-void px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="order-2 lg:order-1">
          <h2 className="font-display text-[10vw] font-extralight uppercase leading-[0.92] tracking-[0.01em] text-paper sm:text-5xl lg:text-6xl">
            Built
            <br />
            on Craft.
          </h2>
          <p className="mt-10 max-w-md text-base font-light leading-relaxed text-bone/60 lg:text-lg">
            Arcane 7 blends traditional barbering with bold color work and
            custom design. Every appointment is built around detail,
            consistency and personal style.
          </p>
        </div>

        <div className="order-1 aspect-[4/5] overflow-hidden lg:order-2">
          <img
            src={images.about}
            alt="Lara Blendz, owner of Arcane 7"
            className="h-full w-full object-cover object-top contrast-[1.05] brightness-[0.92]"
          />
        </div>
      </div>
    </section>
  );
}
