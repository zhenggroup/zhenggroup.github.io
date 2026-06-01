const BLUE = "#002147";
const DARK = "#00172F";
const GOLD = "#B9975B";
const GOLD_LIGHT = "#D8BD7F";
const TEXT = "#06182F";
const BODY = "#445066";
const PAPER = "#F7F9FC";
const RULE = "#D9E1EB";
const SERIF = "Georgia";
const SANS = "Aptos";

function text(slide, ctx, value, x, y, w, h, opts = {}) {
  return ctx.addText(slide, {
    text: value,
    left: x,
    top: y,
    width: w,
    height: h,
    fontSize: opts.size ?? 18,
    color: opts.color ?? TEXT,
    bold: Boolean(opts.bold),
    typeface: opts.face ?? SANS,
    align: opts.align ?? "left",
    valign: opts.valign ?? "top",
    fill: "#00000000",
    line: ctx.line(),
    insets: opts.insets ?? { left: 0, right: 0, top: 0, bottom: 0 },
    name: opts.name,
  });
}

function rect(slide, ctx, x, y, w, h, fill, opts = {}) {
  return ctx.addShape(slide, {
    left: x,
    top: y,
    width: w,
    height: h,
    geometry: opts.geometry ?? "rect",
    fill,
    line: opts.line ?? ctx.line(),
    name: opts.name,
  });
}

function rule(slide, ctx, x, y, w, color = RULE, h = 1.3) {
  rect(slide, ctx, x, y, w, h, color);
}

export async function slide01(presentation, ctx) {
  const slide = presentation.slides.add();

  rect(slide, ctx, 0, 0, 1280, 720, PAPER);
  rect(slide, ctx, 0, 0, 1280, 78, BLUE);
  rect(slide, ctx, 0, 78, 1280, 4, GOLD);
  rect(slide, ctx, 0, 82, 1280, 26, "#FFFFFF");

  rect(slide, ctx, 64, 31, 10, 10, GOLD_LIGHT, { name: "kicker-marker" });
  text(slide, ctx, "SECTION LABEL", 84, 28, 230, 16, {
    size: 9,
    color: GOLD_LIGHT,
    bold: true,
    name: "kicker-label",
  });
  text(slide, ctx, "Slide title goes here", 64, 126, 830, 58, {
    size: 34,
    color: TEXT,
    face: SERIF,
    bold: true,
    name: "title-placeholder",
  });
  text(slide, ctx, "Short claim or transition sentence. Replace with the one thing this slide should prove.", 64, 187, 820, 34, {
    size: 15,
    color: BODY,
    name: "subtitle-placeholder",
  });

  rule(slide, ctx, 64, 238, 1100, RULE, 1.2);
  rule(slide, ctx, 64, 250, 120, GOLD, 3);

  rect(slide, ctx, 64, 292, 682, 286, "#FFFFFF", {
    line: ctx.line("#CAD4E3", 1),
    name: "primary-figure-area",
  });
  text(slide, ctx, "Primary figure / mechanism / chart", 92, 318, 420, 26, {
    size: 18,
    color: TEXT,
    face: SERIF,
    bold: true,
    name: "primary-figure-label",
  });
  text(slide, ctx, "Keep the main proof object here. Use direct labels and avoid decorative boxes.", 92, 352, 500, 48, {
    size: 13,
    color: BODY,
    name: "primary-figure-note",
  });
  rule(slide, ctx, 92, 528, 600, "#E6EBF2", 1);
  text(slide, ctx, "Result / takeaway", 92, 540, 280, 20, {
    size: 11,
    color: GOLD,
    bold: true,
    name: "takeaway-label",
  });

  rect(slide, ctx, 790, 292, 374, 286, "#EEF3F9", {
    line: ctx.line("#D9E1EB", 1),
    name: "right-note-area",
  });
  text(slide, ctx, "Key points", 820, 318, 170, 26, {
    size: 19,
    color: TEXT,
    face: SERIF,
    bold: true,
    name: "notes-heading",
  });
  text(slide, ctx, "1. Replace with concise evidence\n2. Use one claim per bullet\n3. Put caveats or methods here", 820, 365, 300, 92, {
    size: 14,
    color: BODY,
    name: "bullet-placeholder",
  });
  rect(slide, ctx, 820, 500, 88, 3, GOLD);
  text(slide, ctx, "Optional method note or citation.", 820, 520, 294, 32, {
    size: 10,
    color: BODY,
    name: "source-note-placeholder",
  });

  rule(slide, ctx, 64, 650, 1100, RULE, 1);
  text(slide, ctx, "Electrochemical Interface & Conversion Lab | The Zheng Group", 64, 664, 690, 18, {
    size: 9,
    color: BODY,
    name: "footer-label",
  });
  text(slide, ctx, "01", 1124, 660, 40, 24, {
    size: 16,
    color: BLUE,
    face: SERIF,
    bold: true,
    align: "right",
    name: "page-number",
  });

  return slide;
}
