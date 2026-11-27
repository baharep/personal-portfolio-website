import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");
const html = await read("../.vercel/output/static/index.html");
const css = await read("../src/styles/global.css");
const chatApi = await read("../src/pages/api/chat.ts");

const section = (id) => {
  const match = html.match(new RegExp(`<section\\b[^>]*id="${id}"[^>]*>([\\s\\S]*?)</section>`))?.[1];
  assert.ok(match, `expected section #${id}`);
  return match;
};
const texts = (source, pattern) => [...source.matchAll(pattern)].map(([, text]) => text);
const links = () =>
  [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map(([, attributes, content]) => ({
    attributes,
    text: content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
  }));

function contrast(a, b) {
  const lum = (hex) => {
    const [r, g, bl] = hex.match(/[a-f\d]{2}/gi).map((c) => {
      const v = parseInt(c, 16) / 255;
      return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
const token = (name) => css.match(new RegExp(`--${name}:\\s*(#[\\da-f]{6})`, "i"))?.[1];

test("navigation lists the sections in order in a sticky header", () => {
  const nav = html.match(/<nav\b[^>]*aria-label="Main navigation"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
  assert.ok(nav);
  assert.deepEqual(texts(nav, /href="#([^"]+)"/g), [
    "about", "education", "experience", "work", "skills", "outside-of-work", "contact",
  ]);
  assert.match(css, /\.site-header\s*\{[^}]*position:\s*sticky/s);
  assert.match(css, /scroll-padding-top:\s*calc\(var\(--header-height/);
});

test("on narrow screens the menu scrolls sideways with arrows instead of cutting links off", () => {
  assert.match(html, /class="nav-arrow nav-arrow-right"[^>]*aria-label="Show more menu items"/);
  assert.match(html, /class="nav-arrow nav-arrow-left"[^>]*aria-label="Show earlier menu items"/);
  assert.match(css, /\.nav-wrap\.fade-right nav\s*\{[^}]*mask-image/s);
});

test("on phones the portrait comes first and long words cannot widen the page", () => {
  assert.match(css, /\.hero\s*\{[^}]*grid-template-columns:\s*minmax\(0, [\d.]+fr\) minmax\(0, [\d.]+fr\)/s);
  const phone = css.match(/@media \(max-width: 680px\)\s*\{([\s\S]*?)\n\}/)?.[1];
  assert.ok(phone);
  assert.match(phone, /\.hero\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\)/s);
  assert.match(phone, /\.hero-portrait-wrap\s*\{[^}]*order:\s*-1/s);
});

test("hero shows the five disciplines and the portrait", () => {
  const list = html.match(/<ul class="discipline-list"[^>]*>([\s\S]*?)<\/ul>/)?.[1];
  assert.deepEqual(texts(list, /<li>([^<]+)<\/li>/g), ["Creativity", "Engineering", "Education", "Digital Work", "Art"]);
  assert.match(html, /<source srcset="\/images\/portrait\.webp" type="image\/webp"/);
  assert.match(html, /src="\/images\/portrait\.jpg"[^>]*alt="Bahar Emampour sitting in a blue café/);
});

test("the signature logo appears in the header and footer and is monochrome", async () => {
  assert.equal([...html.matchAll(/class="brand-signature" src="\/images\/logos\/[^"]+\.svg"/g)].length, 2);
  assert.equal([...html.matchAll(/<span class="brand-surname">Emampour<\/span>/g)].length, 2);
  const src = html.match(/class="brand-signature" src="([^"]+)"/)[1];
  const logo = await read(`../public${src}`);
  assert.doesNotMatch(logo, /<text|#fff44f|#15648a/i, "outlined paths, no brand colors");
});

test("about covers the requested details", () => {
  const about = section("about");
  for (const detail of [
    "Born in 1992",
    "engineering graduate of the University of Tehran",
    "writing, and artistic activities",
    "connecting with people",
    "Growth",
  ]) {
    assert.ok(about.includes(detail), `expected "${detail}"`);
  }
});

test("experience lists the six roles in the requested order", () => {
  assert.deepEqual(texts(section("experience"), /<h3>([^<]+)<\/h3>/g), [
    "Product Designer working with AI",
    "Manager",
    "Mathematics Teacher",
    "Physics Instructor",
    "Website Designer, Content Creator &amp; Administrator",
    "Administrative and Executive Assistant",
  ]);
});

test("selected work lists Bahar's site first, then Mosharanco and Dr. Zeinab Emampour", () => {
  const work = section("work");
  const projectLinks = links().filter(({ attributes }) =>
    /href="https:\/\/(?:baharemampour\.vercel\.app|mosharanco\.com|drzeinabemampour\.com)"/.test(attributes),
  );
  assert.deepEqual(
    projectLinks.map(({ attributes }) => attributes.match(/href="([^"]+)"/)[1]),
    ["https://baharemampour.vercel.app", "https://mosharanco.com", "https://drzeinabemampour.com"],
  );
  for (const { attributes, text } of projectLinks) {
    assert.match(attributes, /target="_blank"[^>]*rel="noreferrer noopener"/);
    assert.match(text, /^Visit \S+ \(opens in a new tab\)$/);
  }
  for (const alt of ["Mosharanco logo", "Dr. Zainab Emampour logo"]) {
    assert.match(work, new RegExp(`<img[^>]*alt="${alt}"`));
  }
});

test("skill groups follow the requested order and contents", () => {
  const skills = section("skills");
  assert.deepEqual(
    [...skills.matchAll(/<h3>([^<]+)<\/h3><ul><li>([^<]+)<\/li>/g)].map(([, name, first]) => [name, first]),
    [
      ["Personal strengths", "Creative thinking"],
      ["Web &amp; content", "Web applications built with AI"],
      ["Engineering &amp; creative tools", "Working with AI tools"],
      ["Sports", "Volleyball"],
      ["Languages", "Persian (Farsi)"],
    ],
  );
  for (const item of ["Learning new things", "Padel"]) assert.ok(skills.includes(item), item);
  assert.doesNotMatch(html, /SolidWorks/);
});

test("education and hobbies show their photos with descriptive alt text", () => {
  for (const alt of [
    "University of Tehran logo",
    "Ferdowsi University of Mashhad logo",
    "Sampad logo",
    "Bahar wearing her graduation gown and cap",
  ]) {
    assert.match(section("education"), new RegExp(`<img[^>]*alt="${alt}"`));
  }
  assert.equal([...section("outside-of-work").matchAll(/class="hobby-photo"/g)].length, 3);
});

test("every labelled section points at an existing heading", () => {
  const ids = new Set(texts(html, /<h[1-6]\b[^>]*\bid="([^"]+)"/g));
  for (const id of texts(html, /<section\b[^>]*aria-labelledby="([^"]+)"/g)) assert.ok(ids.has(id), id);
});

test("social links open in a new tab with accessible names", () => {
  for (const [label, url] of [
    ["LinkedIn", "https://www.linkedin.com/in/bahar-emampour-780188220/"],
    ["Instagram", "https://www.instagram.com/bahar_explores/"],
    ["Website", "https://baharemampour.com"],
  ]) {
    const link = links().find(({ attributes }) => attributes.includes(`href="${url}"`));
    assert.ok(link, url);
    assert.match(link.attributes, new RegExp(`aria-label="Open Bahar Emampour’s ${label} in a new tab"`));
    assert.match(link.attributes, /rel="noreferrer noopener"/);
  }
});

test("text colors meet WCAG AA and lemon stays readable behind dark text", () => {
  for (const fg of ["muted", "ink-soft", "sky-deep"]) {
    for (const bg of ["paper", "paper-deep"]) {
      assert.ok(contrast(token(fg), token(bg)) >= 4.5, `${fg} on ${bg}`);
    }
  }
  for (const bg of ["lemon", "lemon-soft"]) assert.ok(contrast(token("ink"), token(bg)) >= 7, `ink on ${bg}`);
});

test("the chat widget uses the server route and never exposes the OpenRouter key", () => {
  assert.match(html, /Ask about Bahar/);
  assert.match(chatApi, /OPENROUTER_API_KEY/);
  assert.match(chatApi, /MAX_REQUESTS_PER_MINUTE/);
  assert.match(chatApi, /Do not invent, infer, or embellish/);
  assert.doesNotMatch(html, /OPENROUTER_API_KEY|openrouter\.ai/);
});

test("metadata, robots, and sitemap use the production domain", async () => {
  assert.match(html, /<title>Bahar Emampour \| Multidisciplinary Professional<\/title>/);
  assert.match(html, /<link rel="canonical" href="https:\/\/baharemampour\.com\/"/);
  assert.match(html, /<meta property="og:image" content="https:\/\/baharemampour\.com\/images\/portrait\.jpg"/);
  assert.match(await read("../public/robots.txt"), /Sitemap: https:\/\/baharemampour\.com\/sitemap\.xml/);
  assert.match(await read("../public/sitemap.xml"), /<loc>https:\/\/baharemampour\.com\/<\/loc>/);
});
