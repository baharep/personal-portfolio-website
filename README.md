# Bahar Emampour — Personal Portfolio

A responsive portfolio presenting the professional background, experience, and selected website projects documented in `resome.pdf`. The homepage is prerendered; a small server endpoint powers the AI portfolio assistant.

The visual identity pairs sky blue with a bright lemon yellow (`#fff44f`): blue carries text and surfaces, while lemon is used only for accents such as dots, short lines, the sun disc behind the portrait, and the main button. No words are highlighted with a yellow background, and yellow is never used as text on a light background. Headings use Fraunces (soft axis) and body text uses Manrope, both self-hosted through Fontsource.

The logo is the name “Bahar” as a monochrome signature (`public/images/logos/bahar-signature.svg`), set in Allura and converted to outlined paths so it looks identical everywhere. It is ink on light backgrounds and white in the footer, with “EMAMPOUR” set beside it in small spaced capitals; it carries no color for now. The favicon is a white signature “B” on an ink square.

The hero lists Creativity · Engineering · Education · Digital Work · Art and uses the café portrait (`zero.jpg`, cropped from the waist up and stripped of its photo metadata into `public/images/portrait.jpg`/`.webp`). The sticky header links to About me, Education, Experiences, Selected work, Skills, Outside of work, and Contact; the current section is highlighted while scrolling. On narrower screens the links sit in one horizontally scrollable row, with round arrow buttons and a fade at whichever edge still hides links, so no link looks cut off. A script measures the header height so that anchor jumps land just above each section heading. The page also includes a six-card experience grid led by the AI product design role, three Selected work cards, a fully visible skills grid, a compact three-photo hobbies collage, and an AI assistant that answers questions using only the facts in the portfolio.

The footer links to LinkedIn, Instagram, and `baharemampour.com` with monochrome icons.

## Featured projects

- [baharemampour.vercel.app](https://baharemampour.vercel.app) — this portfolio, built with AI tools
- [mosharanco.com](https://mosharanco.com) — energy company website
- [drzeinabemampour.com](https://drzeinabemampour.com) — general practitioner website

## Stack

- Astro 7
- TypeScript
- Plain CSS
- Fontsource (Fraunces, Manrope)
- OpenRouter chat completions via a server-side Astro endpoint
- Vercel adapter for the server endpoint

## Development

```sh
npm install
npm run dev -- --host 127.0.0.1
```

Open `http://localhost:4321/` while the development server is running.

### AI assistant setup

The assistant sends the visitor's question and a public portfolio profile summary to OpenRouter. The chat window discloses this data flow. Its API key is read only by the server and must never be added to client-side code or committed to source control.

1. Copy `.env.example` to `.env` and set `OPENROUTER_API_KEY` to your own OpenRouter key.
2. Restart `npm run dev` if it was already running.
3. In Vercel, add `OPENROUTER_API_KEY` under **Project Settings → Environment Variables**, then redeploy.

The endpoint limits message size and request frequency, and the assistant is instructed not to invent information missing from the portfolio. The local in-memory rate limit is best-effort; configure a durable rate limiter before exposing the endpoint to significant public traffic.

Run Astro's type/accessibility checks, the production build, and the focused regression tests with:

```sh
npm run check
npm test
```

`npm test` builds the site before checking its generated project links, section labels, SEO metadata, chat widget, social links, and visual design requirements.

## Content and privacy

The PDF resume and details explicitly provided by the portfolio owner are the sources of truth. Do not add qualifications, metrics, dates, or personal details that have not been verified. The “Product Designer working with AI” entry describes this portfolio and has no dates because none were provided. The featured project domains are `mosharanco.com`, `drzeinabemampour.com`, and `baharemampour.vercel.app`. The About text mentions “artistic activities” in general terms only, as requested; no specific art forms are listed. The site uses the resume portrait and links to LinkedIn, Instagram, and the portfolio website; it intentionally omits the phone number. The display name is Bahar Emampour. The resume’s overlapping manager (2020–2026) and mathematics-teacher (2025–2026) dates have been confirmed as intentional.

The About section includes the user-provided birth year (1992), identifies Bahar as an engineering graduate of the University of Tehran, and mentions selected skills and hobbies at the end of the paragraph. The graduation and hobbies photos supplied for the page are resized and served as compressed WebP assets. Other education entries remain in the Education section. Institution marks there identify the schools only and do not imply endorsement. The University of Tehran logo is sourced from [Wikipedia's file page](https://en.wikipedia.org/wiki/File:University_of_Tehran_logo.svg), which identifies it as a non-free logo based on the university's official website; confirm appropriate rights before public deployment. The Sampad SVG is available under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) and was created by Ali Zifan ([source file](https://commons.wikimedia.org/wiki/File:Sampad.svg)). The Ferdowsi mark is sourced from the university's [official website](https://www.um.ac.ir/images/6447a3b992c1eda59458c71e5a279ffb.png).

The hero portrait is softly echoed behind its frame with a blurred, low-opacity layer from the same photo, with a lemon-yellow disc and a sky-blue offset frame around it. The portrait crop keeps the café sign mostly out of frame.

The Mosharanco logo source is converted from its official JPEG to a transparent PNG; Dr. Zainab Emampour's logo is served locally as SVG. Both display without a white logo plate. The source assets are [Mosharanco](https://mosharanco.com/wp-content/uploads/2026/08/logo.jpg) and [Dr. Zainab Emampour](https://drzeinabemampour.com/wp-content/uploads/2026/09/logo-for-header-site.svg). The gap between Selected work and Skills is 40–64px so the white cards do not crowd the Skills heading.

See [`review.md`](./review.md) for the code-review findings and remediation status.

## Deployment

The site is prepared for deployment to Vercel with the production domain `baharemampour.com`. Build with `npm run build`; Vercel's Astro adapter configures the deployable output. In Vercel, use the Astro framework preset and add `baharemampour.com` to the project’s domains. Configure DNS with the provider and verify the custom domain after deployment. The site has not yet been deployed; DNS and live metadata still need verification.

The canonical URL, Open Graph preview, favicon, `sitemap.xml`, and `robots.txt` use the production domain. Verify them against the live deployment after DNS is configured.