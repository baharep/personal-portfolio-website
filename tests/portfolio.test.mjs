import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../.vercel/output/static/index.html", import.meta.url), "utf8");
const css = await readFile(new URL("../src/styles/global.css", import.meta.url), "utf8");
const chatApi = await readFile(new URL("../src/pages/api/chat.ts", import.meta.url), "utf8");

function getColorToken(name) {
  const match = css.match(new RegExp(`--${name}:\\s*(#[\\da-f]{6})`, "i"));
  assert.ok(match, `expected CSS color token "${name}"`);
  return match[1];
}

function luminance(color) {
  const channels = color.match(/[a-f\d]{2}/gi).map((channel) => parseInt(channel, 16) / 255);
  const linear = channels.map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrastRatio(foreground, background) {
  const first = luminance(foreground);
  const second = luminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

function getLinks() {
  return [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map(([, attributes, content]) => ({
    attributes,
    text: content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
  }));
}

test("featured project cards link to the confirmed domains", () => {
  const projectUrls = getLinks()
    .map(({ attributes }) => attributes.match(/\bhref="(https:\/\/[^"]+)"/)?.[1])
    .filter((href) =>
      href === "https://mosharanco.com" ||
      href === "https://drzeinabemampour.com"
    );

  assert.deepEqual(projectUrls, [
    "https://mosharanco.com",
    "https://drzeinabemampour.com",
  ]);
});

test("featured project cards include transparent official logos and compact section spacing", async () => {
  const work = html.match(/<section\b[^>]*id="work"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert.ok(work, "expected the selected work section");

  for (const [source, alt] of [
    ["/images/logos/mosharanco.png", "Mosharanco logo"],
    ["/images/logos/drzeinabemampour.svg", "Dr. Zainab Emampour logo"],
  ]) {
    assert.match(work, new RegExp(`src="${source}"[^>]*alt="${alt}"`));
    await readFile(new URL(`../public${source}`, import.meta.url));
  }
  const mosharancoLogo = await readFile(
    new URL("../public/images/logos/mosharanco.png", import.meta.url),
  );
  assert.equal(mosharancoLogo.readUInt8(25), 6, "Mosharanco logo should be RGBA");
  assert.match(css, /\.project-card\s*\{[^}]*min-height:\s*17rem/s);
  assert.match(css, /\.project-logo\s*\{[^}]*height:\s*5rem/s);
  assert.match(css, /\.project-logo\s*\{[^}]*background:\s*transparent/s);
  assert.match(css, /\.work-section\s*\{[^}]*padding-bottom:\s*0/s);
  assert.match(css, /\.skills-section\s*\{[^}]*padding-top:\s*clamp\(1rem, 2vw, 2rem\)/s);
});

test("the primary navigation follows the requested section order in a sticky same-page header", () => {
  const navigation = html.match(
    /<nav\b[^>]*aria-label="Main navigation"[^>]*>([\s\S]*?)<\/nav>/,
  );
  const headerStyles = css.match(/\.site-header\s*\{([^}]+)\}/);

  assert.ok(navigation, "expected primary navigation");
  assert.ok(headerStyles, "expected site header styles");
  assert.deepEqual(
    [...navigation[1].matchAll(/\bhref="#([^"]+)"/g)].map(([, id]) => id),
    ["about", "education", "experience", "work", "skills", "outside-of-work", "contact"],
  );
  assert.match(navigation[1], /About me/);
  assert.match(navigation[1], />Education</);
  assert.match(navigation[1], /Experiences/);
  assert.match(navigation[1], /Outside of work/);
  assert.match(headerStyles[1], /position:\s*sticky/);
  assert.match(headerStyles[1], /top:\s*0/);
  assert.match(css, /@media \(max-width: 680px\)[\s\S]*?\.site-header nav\s*\{[^}]*flex-wrap:\s*wrap/);
  assert.doesNotMatch(html, /Let’s connect/);
});

test("about mentions only the requested education alongside selected skills and hobbies", () => {
  const about = html.match(/<section\b[^>]*id="about"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert.ok(about, "expected the about section");

  for (const detail of [
    "Born in 1992",
    "engineering graduate of the University of Tehran",
    "communication skills",
    "writing",
    "Personal value",
    "Growth",
  ]) {
    assert.ok(about.includes(detail), `expected about detail "${detail}"`);
  }
  assert.doesNotMatch(about, /teenagers and young adults/i);
  assert.ok(
    about.indexOf("Outside work") > about.indexOf("administration."),
    "hobbies should be the final part of the about paragraph",
  );
  assert.doesNotMatch(about, /Ferdowsi University|Sampad Schools|Bachelor’s Degree|Master’s Degree/);
});

test("the portrait's outdoor colors softly blend into the hero background", () => {
  const photoEcho = css.match(/\.hero-portrait-wrap::before\s*\{([^}]+)\}/)?.[1];
  assert.ok(photoEcho, "expected the portrait background layer");
  assert.match(photoEcho, /background-image:\s*url\("\/images\/portrait\.jpg"\)/);
  assert.match(photoEcho, /filter:\s*blur\(/);
  assert.match(photoEcho, /opacity:\s*0\.2/);
  assert.match(photoEcho, /mask-image:\s*radial-gradient/);
  assert.match(css, /@media \(max-width: 680px\)[\s\S]*?\.hero-portrait-wrap::before/);
});

test("education entries display institution marks with descriptive alternatives", () => {
  for (const alt of [
    "University of Tehran logo",
    "Ferdowsi University of Mashhad logo",
    "Sampad logo",
  ]) {
    assert.match(html, new RegExp(`<img[^>]*alt="${alt}"`));
  }
});

test("education shows the graduation photo while languages are grouped under skills", () => {
  const education = html.match(/<section\b[^>]*id="education"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  const skills = html.match(/<section\b[^>]*id="skills"[^>]*>([\s\S]*?)<\/section>/)?.[1];

  assert.ok(education, "expected the education section");
  assert.ok(skills, "expected the skills section");
  assert.match(education, /src="\/images\/graduation\.webp"[^>]*alt="Bahar wearing her graduation gown and cap"/);
  assert.doesNotMatch(education, /languages-card|Persian \(Farsi\)|>English</);
  assert.match(css, /\.education-layout\s*\{[^}]*align-items:\s*stretch/s);
  assert.match(css, /\.graduation-photo img\s*\{[^}]*position:\s*absolute;[^}]*height:\s*100%/s);
  assert.match(skills, /<h3>Languages<\/h3>/);
  assert.match(skills, /Persian \(Farsi\)/);
  assert.match(skills, />English</);
});

test("hobbies show a compact three-photo collage using optimized assets", async () => {
  const hobbies = html.match(/<section\b[^>]*id="outside-of-work"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert.ok(hobbies, "expected the hobbies section");

  for (const [file, alt] of [
    ["/images/hobbies/tennis.webp", "Bahar holding a tennis racket on a court"],
    ["/images/hobbies/nature-walk.webp", "Bahar outdoors on a tree-lined path"],
    ["/images/hobbies/singing.webp", "Bahar singing into a microphone"],
  ]) {
    assert.match(hobbies, new RegExp(`src="${file}"[^>]*alt="${alt}"`));
    const image = await readFile(new URL(`../public${file}`, import.meta.url));
    assert.ok(image.byteLength < 400_000, `${file} should remain compact`);
  }
  assert.match(css, /\.hobbies-collage\s*\{[^}]*grid-template-columns:\s*repeat\(3,/s);
  assert.match(css, /\.hobby-photo\s*\{[^}]*height:\s*12rem/s);
  assert.match(css, /\.graduation-photo\s*\{[^}]*width:\s*min\(100%, 19rem\)/s);
  assert.match(css, /\.hobbies-copy \.section-heading\s*\{[^}]*margin:\s*0/s);
  assert.match(css, /\.hobbies-layout\s*\{[^}]*align-items:\s*center/s);
  assert.match(css, /\.hobbies-section\s*\{[^}]*padding-bottom:\s*clamp\(2\.5rem, 5vw, 4rem\)/s);
});

test("experience is a compact six-entry grid and includes the requested AI design role", () => {
  const experience = html.match(/<section\b[^>]*id="experience"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert.ok(experience, "expected experience cards");
  assert.equal([...experience.matchAll(/class="experience-item"/g)].length, 6);
  assert.match(experience, /Product Designer working with AI/);
  assert.match(css, /\.experience-list\s*\{[^}]*grid-template-columns:\s*repeat\(3,/s);
  assert.match(css, /@media \(max-width: 900px\)[\s\S]*?\.experience-list\s*\{[^}]*repeat\(2,/);
});

test("skills stay in one horizontally scrollable row and project cards allow space for logos", () => {
  assert.match(css, /\.skill-grid\s*\{[^}]*display:\s*flex;[^}]*overflow-x:\s*auto/s);
  assert.match(css, /\.skill-group\s*\{[^}]*flex:\s*0 0 calc\(\(100% - 3rem\) \/ 4\)/s);
  assert.match(css, /\.project-card\s*\{[^}]*min-height:\s*17rem/s);
});

test("anchor spacing uses one header-aware offset instead of doubling section margins", () => {
  assert.match(css, /scroll-padding-top:\s*6\.75rem/);
  assert.match(css, /@media \(max-width: 560px\)[\s\S]*?scroll-padding-top:\s*8rem/);
  assert.doesNotMatch(css, /scroll-margin-top/);
});

test("personal strengths begin in the requested order", () => {
  const strengths = [
    html.indexOf("Creative thinking"),
    html.indexOf("Flexibility and ability to adapt to new conditions"),
    html.indexOf("Good vocal ability"),
  ];

  assert.ok(strengths.every((index) => index >= 0), "expected all three strengths");
  assert.deepEqual([...strengths].sort((a, b) => a - b), strengths);
});

test("each labelled section references an existing heading", () => {
  const headingIds = new Set(
    [...html.matchAll(/<h[1-6]\b[^>]*\bid="([^"]+)"/g)].map(([, id]) => id),
  );
  const sectionLabels = [
    ...html.matchAll(/<section\b[^>]*\baria-labelledby="([^"]+)"/g),
  ].map(([, id]) => id);

  assert.ok(sectionLabels.length > 0, "expected labelled sections");
  for (const id of sectionLabels) {
    assert.ok(headingIds.has(id), `section heading "${id}" must exist`);
  }
});

test("skills and outside-of-work activities include the requested personal strengths and hobbies", () => {
  for (const skill of [
    "Ability to learn",
    "teenagers and young adults",
    "Writing",
    "Good vocal ability",
    "Volleyball",
    "Swimming",
    "Running",
  ]) {
    assert.ok(html.includes(skill), `expected skill "${skill}"`);
  }

  for (const hobby of ["Exercise and sports", "Singing", "Travel", "Nature and outdoor exploration"]) {
    assert.ok(html.includes(hobby), `expected hobby "${hobby}"`);
  }
});

test("decorative arrow glyphs are removed", () => {
  assert.doesNotMatch(html, /[↗↘↑↓←→]/u);
});

test("project links have distinct names and disclose the new-tab behavior", () => {
  const projectLinks = getLinks().filter(({ attributes }) =>
    /\bhref="https:\/\/(?:mosharanco\.com|drzeinabemampour\.com)"/.test(attributes),
  );

  assert.equal(projectLinks.length, 2);
  assert.match(projectLinks[0].text, /Visit mosharanco\.com/);
  assert.match(projectLinks[1].text, /Visit drzeinabemampour\.com/);
  for (const { attributes, text } of projectLinks) {
    assert.match(attributes, /\btarget="_blank"/);
    assert.match(attributes, /\brel="noreferrer noopener"/);
    assert.match(text, /opens in a new tab/);
  }
});

test("production identity and canonical/social metadata use the confirmed domain", () => {
  assert.match(html, /<title>Bahar Emampour \| Multidisciplinary Professional<\/title>/);
  assert.match(html, /<link rel="canonical" href="https:\/\/baharemampour\.com\/"/);
  assert.match(html, /<meta property="og:url" content="https:\/\/baharemampour\.com\/"/);
  assert.match(
    html,
    /<meta property="og:image" content="https:\/\/baharemampour\.com\/images\/portrait\.jpg"/,
  );
});

test("semantic text colors meet WCAG AA on both backgrounds without lemon accents", () => {
  const backgrounds = [getColorToken("paper"), getColorToken("paper-deep")];
  const textColors = [getColorToken("muted"), getColorToken("ink-soft"), getColorToken("sky-deep")];

  for (const foreground of textColors) {
    for (const background of backgrounds) {
      assert.ok(
        contrastRatio(foreground, background) >= 4.5,
        `${foreground} on ${background} must meet 4.5:1`,
      );
    }
  }
  assert.doesNotMatch(css, /lemon|#(?:e5f45b|626b0a)/i);
});

test("the portrait uses a rounded rectangle rather than a domed frame", async () => {
  assert.match(css, /\.portrait-frame\s*\{[^}]*border-radius:\s*1\.5rem/s);
});

test("the chat widget calls a server route and keeps the OpenRouter secret off the page", () => {
  assert.match(html, /Ask about Bahar/);
  assert.match(chatApi, /OPENROUTER_API_KEY/);
  assert.match(chatApi, /openrouter\.ai\/api\/v1\/chat\/completions/);
  assert.doesNotMatch(html, /OPENROUTER_API_KEY|openrouter\.ai/);
  assert.match(chatApi, /MAX_REQUESTS_PER_MINUTE/);
  assert.match(chatApi, /Do not invent, infer, or embellish/);
  assert.match(css, /\.sr-only\s*\{/);
});

test("LinkedIn, Instagram, and the portfolio website have monochrome icon links", () => {
  for (const [label, url] of [
    ["LinkedIn", "https://www.linkedin.com/in/bahar-emampour-780188220/"],
    ["Instagram", "https://www.instagram.com/bahar_explores/"],
    ["Website", "https://baharemampour.com"],
  ]) {
    const link = getLinks().find(({ attributes }) => attributes.includes(`href="${url}"`));
    assert.ok(link, `expected social link ${url}`);
    assert.match(link.attributes, /\btarget="_blank"/);
    assert.match(link.attributes, /\brel="noreferrer noopener"/);
    assert.match(link.attributes, /aria-label="Open Bahar Emampour/);
    assert.match(link.attributes, new RegExp(`aria-label="Open Bahar Emampour’s ${label} in a new tab"`));
    assert.equal(link.text, label);
  }
  assert.match(html, /class="social-icon-frame"/);
  assert.match(html, /stroke="currentColor"/);
  assert.doesNotMatch(html, /Open profile|Designed with intention/);
  assert.match(html, /Designed by Bahar Emampour/);
});

test("section titles stay on one line and the language caveat is removed", () => {
  assert.match(css, /\.education-heading \.section-heading h2,[\s\S]*?white-space:\s*nowrap/);
  assert.doesNotMatch(html, /Languages are listed as provided; proficiency levels were not specified/);
  assert.doesNotMatch(css, /\.language-note/);
});

test("robots and sitemap identify the confirmed portfolio domain", async () => {
  const robots = await readFile(new URL("../public/robots.txt", import.meta.url), "utf8");
  const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");

  assert.match(robots, /Sitemap: https:\/\/baharemampour\.com\/sitemap\.xml/);
  assert.match(sitemap, /<loc>https:\/\/baharemampour\.com\/<\/loc>/);
});
