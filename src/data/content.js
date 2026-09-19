// Central content + image registry for ARCANE 7 BARBERSHOP.
// All photos are real shop/barber photography, stored in /public/images.

export const images = {
  hero: "/images/hero-placeholder.svg",
  splitRight: "/images/gallery-1.jpg",
  shop: "/images/shop-sign.jpg",
  about: "/images/about-owner.jpg",
  emblem: "/images/emblem.jpg",
  gallery: [
    "/images/gallery-1.jpg", // swirl hair tattoo linework, shop interior
    "/images/gallery-2.jpg", // icy blue frosted fade
    "/images/gallery-3.jpg", // curly fade, mural backdrop
    "/images/gallery-4.jpg", // clean fade, plant accent
    "/images/gallery-5.jpg", // clean fade with waves
    "/images/gallery-6.jpg", // sharp lineup with a wavy, textured top
    "/images/gallery-7.jpg", // wavy textured fade, mural backdrop
  ],
  gallery3Before: "/images/gallery-3-before.jpg",
  gallery3After: "/images/gallery-3-after.jpg",
  galleryBefore2: "/images/gallery-before-2.jpg",
  galleryAfter2: "/images/gallery-after-2.jpg",
  barbers: [
    "/images/barber-larablendz.jpg",
    "/images/barber-infernalfadez.jpg",
    "/images/barber-fadezbyyair.jpg",
    "/images/barber-velozcutzz.jpg",
    "/images/barber-clipperdonlito.jpg",
    "/images/barber-byfredo.jpg",
  ],
  /* Two photos per barber for the "Crafted With Intention" section, pulled
     from each barber's own folder — not generic shop gallery shots. */
  barberWork: [
    ["/images/work-larablendz-1.jpg", "/images/work-larablendz-2.jpg"],
    ["/images/work-infernalfadez-1.jpg", "/images/work-infernalfadez-2.jpg"],
    ["/images/work-fadezbyyair-1.jpg", "/images/work-fadezbyyair-2.jpg"],
    ["/images/work-velozcutzz-1.jpg", "/images/work-velozcutzz-2.jpg"],
    ["/images/work-clipperdonlito-1.jpg", "/images/work-clipperdonlito-2.jpg"],
    ["/images/work-byfredo-1.jpg", "/images/work-byfredo-2.jpg"],
  ],
};

export const shop = {
  name: "ARCANE 7",
  fullName: "ARCANE 7 BARBERSHOP",
  addressLine1: "2522 J St",
  addressLine2: "Sacramento, CA",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=2522+J+St,+Sacramento,+CA",
  instagram: "https://www.instagram.com/arcane7barbershop",
  instagramHandle: "arcane7barbershop",
};

export const services = [
  {
    n: "01",
    name: "SIGNATURE CUT",
    desc: "A precision cut built around your face shape and hair type — consulted, cut, finished.",
  },
  {
    n: "02",
    name: "SKIN FADE",
    desc: "Razor-clean fade from skin to length, blended by hand for a seamless transition.",
  },
  {
    n: "03",
    name: "CUT + BEARD",
    desc: "Full cut paired with a shaped, lined beard trim — one appointment, one finish.",
  },
];

export const barbers = [
  {
    n: "01",
    name: "LARA BLENDZ",
    handle: "larablendz",
    instagram: "https://www.instagram.com/larablendz",
    title: "OWNER / BARBER",
    bio: "Owner of Arcane 7. Sharp, precise fades with an editorial finish.",
  },
  {
    n: "02",
    name: "INFERNALFADEZ",
    handle: "infernalfadez",
    instagram: "https://www.instagram.com/infernalfadez",
    title: "BARBER",
    bio: "Clean skin fades finished with sharp, deliberate line work.",
  },
  {
    n: "03",
    name: "FADEZ BY YAIR",
    handle: "fadezby.yair",
    instagram: "https://www.instagram.com/fadezby.yair",
    title: "BARBER",
    bio: "Bold color transformations paired with custom hair tattoo art.",
  },
  {
    n: "04",
    name: "VELOZCUTZZ",
    handle: "velozcutzz",
    instagram: "https://www.instagram.com/velozcutzz",
    title: "BARBER",
    bio: "Statement color work and freehand shave designs.",
  },
  {
    n: "05",
    name: "CLIPPER DON LITO",
    handle: "clipperdonlito",
    instagram: "https://www.instagram.com/clipperdonlito",
    title: "BARBER",
    bio: "Textbook fades with clean, consistent blends every time.",
  },
  {
    n: "06",
    name: "BY.FREDO_",
    handle: "by.fredo_",
    instagram: "https://www.instagram.com/by.fredo_",
    title: "BARBER",
    bio: "Sharp shape-ups and classic cuts with a modern edge.",
  },
];
