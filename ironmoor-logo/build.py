"""Build Ironmoor logo SVGs. All text is converted to outlines (no font needed)."""
import math, os, sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = sys.argv[1]
os.makedirs(OUT, exist_ok=True)

BOLD = TTFont(os.path.join(HERE, "fonts/Oswald-Bold.ttf"))
MED = TTFont(os.path.join(HERE, "fonts/Oswald-Medium.ttf"))
CAP = 810 / 1000  # cap height / em

CHARCOAL = "#1F2326"
FORGE = "#D9531E"
WHITE = "#FFFFFF"


def glyph_info(font, ch):
    gs = font.getGlyphSet()
    name = font.getBestCmap()[ord(ch)]
    return gs, name, gs[name].width


def text_width(font, text, size, track=0):
    upm = font["head"].unitsPerEm
    w = sum(glyph_info(font, c)[2] for c in text) * size / upm
    return w + track * (len(text) - 1)


def text_path(font, text, x, y, size, track=0):
    """Straight text, baseline at y, starting at x. Returns path d."""
    upm = font["head"].unitsPerEm
    s = size / upm
    pen = SVGPathPen(None, ntos=lambda v: f"{v:.2f}".rstrip("0").rstrip("."))
    for c in text:
        gs, name, adv = glyph_info(font, c)
        gs[name].draw(TransformPen(pen, (s, 0, 0, -s, x, y)))
        x += adv * s + track
    return pen.getCommands()


def arc_text_path(font, text, cx, cy, r_base, size, track, where):
    """Text centered on top (reads clockwise, letters point out) or bottom
    (reads left-to-right, letters point in) of a circle."""
    upm = font["head"].unitsPerEm
    s = size / upm
    r_mid = r_base + (CAP * size / 2) * (1 if where == "top" else -1)
    total = text_width(font, text, size, track)
    pen = SVGPathPen(None, ntos=lambda v: f"{v:.2f}".rstrip("0").rstrip("."))
    pos = 0.0
    for c in text:
        gs, name, adv = glyph_info(font, c)
        a = adv * s
        center = pos + a / 2 - total / 2
        th = center / r_mid
        cos, sin = math.cos(th), math.sin(th)
        if where == "top":
            # rotate(th) . translate(0,-r_base) . translate(-a/2,0) . scale(s,-s)
            ox, oy = -a / 2, -r_base
            m = (s * cos, s * sin, s * sin, -s * cos,
                 cx + cos * ox - sin * oy, cy + sin * ox + cos * oy)
        else:
            # rotate(-th) . translate(0,r_base) . translate(-a/2,0) . scale(s,-s)
            ox, oy = -a / 2, r_base
            m = (s * cos, -s * sin, -s * sin, -s * cos,
                 cx + cos * ox + sin * oy, cy - sin * ox + cos * oy)
        gs[name].draw(TransformPen(pen, m))
        pos += a + track
    return pen.getCommands()


def ibeam(cx, cy, w, h, flange, web, fillet):
    """I-beam cross-section as one closed path, with radiused web roots."""
    x0, x1 = cx - w / 2, cx + w / 2
    y0, y1 = cy - h / 2, cy + h / 2
    wl, wr = cx - web / 2, cx + web / 2
    ft, fb = y0 + flange, y1 - flange
    f = fillet
    return (
        f"M{x0} {y0}H{x1}V{ft}H{wr + f}"
        f"A{f} {f} 0 0 0 {wr} {ft + f}V{fb - f}"
        f"A{f} {f} 0 0 0 {wr + f} {fb}H{x1}V{y1}H{x0}V{fb}H{wl - f}"
        f"A{f} {f} 0 0 0 {wl} {fb - f}V{ft + f}"
        f"A{f} {f} 0 0 0 {wl - f} {ft}H{x0}Z"
    )


def ring(cx, cy, r_out, r_in):
    return (f"M{cx - r_out} {cy}a{r_out} {r_out} 0 1 0 {2 * r_out} 0a{r_out} {r_out} 0 1 0 {-2 * r_out} 0Z"
            f"M{cx - r_in} {cy}a{r_in} {r_in} 0 1 1 {2 * r_in} 0a{r_in} {r_in} 0 1 1 {-2 * r_in} 0Z")


def dot(cx, cy, r):
    return f"M{cx - r} {cy}a{r} {r} 0 1 0 {2 * r} 0a{r} {r} 0 1 0 {-2 * r} 0Z"


def svg(w, h, body, title, bg=None):
    rect = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">'
            f"<title>{title}</title>{rect}{body}</svg>\n")


def p(d, fill):
    return f'<path fill="{fill}" fill-rule="evenodd" d="{d}"/>'


# ---------- Badge ----------
def badge(main, accent, bg=None):
    S, c = 600, 300
    parts = []
    parts.append(p(ring(c, c, 292, 272), main))         # outer ring, 20 thick
    parts.append(p(ring(c, c, 206, 194), main))         # inner ring, 12 thick
    size = 50
    capH = CAP * size                                   # ~40.5
    band_in, band_out = 206, 272
    pad = (band_out - band_in - capH) / 2
    parts.append(p(arc_text_path(BOLD, "IRONMOOR", c, c, band_in + pad, size, 30, "top"), main))
    parts.append(p(arc_text_path(BOLD, "WELDING & FABRICATION", c, c, band_out - pad, size * 0.84, 5, "bottom"), main))
    mid = (band_in + band_out) / 2
    parts.append(p(dot(c - mid, c, 11) + dot(c + mid, c, 11), accent))
    # I-beam with EST / 2026 tucked into the recesses beside the web
    bw, bh, fl, web = 268, 228, 46, 52
    parts.append(p(ibeam(c, c, bw, bh, fl, web, 16), accent))
    es = 40
    recess_c = (bw / 2 + web / 2) / 2 + 2
    base = c + CAP * es / 2
    for txt, sx in (("EST", -1), ("2026", 1)):
        tw = text_width(BOLD, txt, es, 3)
        parts.append(p(text_path(BOLD, txt, c + sx * recess_c - tw / 2, base, es, 3), main))
    return svg(S, S, "".join(parts), "Ironmoor Welding &amp; Fabrication badge", bg)


# ---------- Horizontal lockup ----------
def horizontal(main, accent, tagline=False, bg=None):
    H = 240 if tagline else 200
    icon_h = 150
    pad = 25
    parts = [p(ibeam(pad + 150 / 2 * 1.12, 100, icon_h * 1.12, icon_h, 30, 34, 10), accent)]
    x = pad + icon_h * 1.12 + 40
    name_size = 112
    track = 10
    name_w = text_width(BOLD, "IRONMOOR", name_size, track)
    name_base = 100 - 75 / 2 + CAP * name_size
    parts.append(p(text_path(BOLD, "IRONMOOR", x, 25 + CAP * name_size, name_size, track), main))
    # descriptor justified to the wordmark width
    ds = 36
    desc = "WELDING & FABRICATION"
    raw = text_width(MED, desc, ds)
    dtrack = (name_w - raw) / (len(desc) - 1)
    parts.append(p(text_path(MED, desc, x, 175, ds, dtrack), main))
    W = x + name_w + pad
    if tagline:
        ts = 26
        tag = "METAL, START TO FINISH."
        tw = text_width(MED, tag, ts, 4)
        parts.append(p(f"M{pad} 200H{W - pad}V207H{pad}Z", accent))
        parts.append(p(text_path(MED, tag, W - pad - tw, 202 + 14 + CAP * ts, ts, 4), main))
        H = 202 + 14 + CAP * ts + 12
    return svg(round(W), round(H), "".join(parts), "Ironmoor Welding &amp; Fabrication", bg)


# ---------- Stacked lockup ----------
def stacked(main, accent, bg=None):
    name_size, track = 120, 10
    name_w = text_width(BOLD, "IRONMOOR", name_size, track)
    W = name_w + 60
    cx = W / 2
    parts = [p(ibeam(cx, 30 + 90, 200, 180, 36, 42, 12), accent)]
    y = 30 + 180 + 40 + CAP * name_size
    parts.append(p(text_path(BOLD, "IRONMOOR", 30, y, name_size, track), main))
    ds = 38
    desc = "WELDING & FABRICATION"
    dtrack = (name_w - text_width(MED, desc, ds)) / (len(desc) - 1)
    y2 = y + 28 + CAP * ds
    parts.append(p(text_path(MED, desc, 30, y2, ds, dtrack), main))
    return svg(round(W), round(y2 + 30), "".join(parts), "Ironmoor Welding &amp; Fabrication", bg)


def icon(main, bg=None):
    return svg(240, 240, p(ibeam(120, 120, 200, 170, 40, 48, 12), main), "Ironmoor I-beam mark", bg)


variants = {
    "color": (CHARCOAL, FORGE, None),
    "black": ("#000000", "#000000", None),
    "white": (WHITE, WHITE, None),
    "reverse": (WHITE, FORGE, None),
}
for vname, (m, a, bg) in variants.items():
    open(f"{OUT}/ironmoor-badge-{vname}.svg", "w").write(badge(m, a, bg))
    open(f"{OUT}/ironmoor-horizontal-{vname}.svg", "w").write(horizontal(m, a, False, bg))
    open(f"{OUT}/ironmoor-horizontal-tagline-{vname}.svg", "w").write(horizontal(m, a, True, bg))
    open(f"{OUT}/ironmoor-stacked-{vname}.svg", "w").write(stacked(m, a, bg))
for vname, col in (("color", FORGE), ("black", "#000000"), ("white", WHITE)):
    open(f"{OUT}/ironmoor-icon-{vname}.svg", "w").write(icon(col))
print("ok")
