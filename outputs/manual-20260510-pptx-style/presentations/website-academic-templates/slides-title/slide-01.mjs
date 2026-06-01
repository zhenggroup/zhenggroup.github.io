const BLUE = "#002147";
const DARK = "#00172F";
const GOLD = "#B9975B";
const GOLD_LIGHT = "#D8BD7F";
const PAPER = "#F7F9FC";
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
    color: opts.color ?? "#FFFFFF",
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
    line: opts.line ?? ctx.line("#00000000", 0),
    name: opts.name,
  });
}

function rule(slide, ctx, x, y, w, color, h = 1.2) {
  rect(slide, ctx, x, y, w, h, color);
}

export async function slide01(presentation, ctx) {
  const slide = presentation.slides.add();

  rect(slide, ctx, 0, 0, 1280, 720, DARK);
  rect(slide, ctx, 0, 0, 1280, 720, BLUE);
  rect(slide, ctx, 0, 0, 1280, 720, "#00172FCC");
  rect(slide, ctx, 0, 0, 520, 720, "#FFFFFF08");
  rect(slide, ctx, 72, 91, 310, 3, GOLD);
  rect(slide, ctx, 72, 586, 1136, 1.4, "#FFFFFF38");
  rect(slide, ctx, 72, 589, 134, 3, GOLD_LIGHT);

  rect(slide, ctx, 72, 68, 10, 10, GOLD_LIGHT, { name: "kicker-marker" });
  text(slide, ctx, "THE ZHENG GROUP", 92, 64, 310, 20, {
    size: 10,
    color: GOLD_LIGHT,
    bold: true,
    name: "kicker-label",
  });
  text(slide, ctx, "Presentation title goes here", 72, 178, 760, 156, {
    size: 58,
    color: "#FFFFFF",
    face: SERIF,
    bold: true,
    name: "title-placeholder",
  });
  text(slide, ctx, "Electrochemical Interface & Conversion Lab @ GTIIT", 74, 346, 650, 32, {
    size: 21,
    color: "#E7EDF5",
    name: "subtitle-placeholder",
  });
  text(slide, ctx, "Presenter name  |  Meeting / conference  |  Date", 76, 432, 640, 24, {
    size: 13,
    color: "#D6DFEB",
    name: "metadata-placeholder",
  });

  rect(slide, ctx, 860, 150, 230, 230, "#FFFFFF10", {
    geometry: "ellipse",
    name: "soft-orbit-01",
  });
  rect(slide, ctx, 940, 248, 124, 124, "#B9975B24", {
    geometry: "ellipse",
    name: "soft-orbit-02",
  });
  rule(slide, ctx, 858, 435, 246, GOLD_LIGHT, 2);
  text(slide, ctx, "Operando electrochemistry\nElectrocatalysis\nInterface science", 858, 455, 290, 90, {
    size: 18,
    color: "#FFFFFFD9",
    face: SERIF,
    name: "theme-words",
  });

  await ctx.addImage(slide, {
    path: "/Users/wzheng/Website/github page/zhenggroup.github.io/img/gtiit.png",
    left: 74,
    top: 616,
    width: 245,
    height: 70,
    fit: "contain",
    alt: "Guangdong Technion logo",
    name: "gtiit-logo",
  });
  await ctx.addImage(slide, {
    path: "/Users/wzheng/Website/github page/zhenggroup.github.io/img/technion1.png",
    left: 356,
    top: 616,
    width: 190,
    height: 70,
    fit: "contain",
    alt: "Technion logo",
    name: "technion-logo",
  });
  text(slide, ctx, "Electrochemical Interface & Conversion Lab", 932, 632, 276, 18, {
    size: 10,
    color: "#D6DFEB",
    align: "right",
    name: "footer-lab",
  });
  text(slide, ctx, "website style template", 976, 652, 232, 16, {
    size: 8,
    color: "#B9975B",
    align: "right",
    bold: true,
    name: "footer-note",
  });

  return slide;
}
