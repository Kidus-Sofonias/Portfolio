# Personal Section — Real Hobbies & Finished Books (Implementation Spec)

**Status:** Approved — ready for implementation
**Scope:** `src/components/PersonalSection.jsx` (and any shared CSS/utilities it needs)
**Owner:** Kidus Sofonias
**Spec author:** Buffy (via 4 interview rounds, August 2026)

---

## 1. Overview

Replace the placeholder content in the **05 — PERSONAL** section with:

1. **Three real hobby cards** — Chess, Basketball, Marvel fandom — each with personal detail.
2. **A "Books I've Finished" carousel** — real book covers, coverflow-style, center-highlighted,
   3 cards visible on large screens, 1 on mobile, autoplay + arrows + swipe, click opens a detail popup.
3. **Remove** the old placeholder hobbies (Side Projects, ML Experiments, Reading, Ethiopian History,
   Football, Music) and the "Currently Reading" tech books (Design of Everyday Things, Deep Learning,
   Atomic Habits, Pragmatic Programmer) **entirely** — no legacy data stays.

The section subtitle/intro copy should be adjusted so it no longer frames the section as
"currently reading" — it's now a "books I've finished" showcase.

---

## 2. Hobbies (3 cards — final content)

| # | Hobby | Icon (lucide-react) | Description text |
|---|-------|--------------------|------------------|
| 1 | **Chess** | `ChessKnight` (or `Swords` if unavailable) | "~1200 rating on chess.com. I play the London System and I'm a devoted GothamChess fan — I've internalized more Levy wisdom than I'd care to admit." |
| 2 | **Basketball** | `Dribbble` (basketball icon) | "Played seriously enough to take a full summer training — court time sharpens the same skills I use in code: reading the field, timing, and quick decisions." |
| 3 | **Marvel** | `Zap` (or `Flame` / `IronMan`-adjacent) | "Dedicated Marvel fan. My favorite character is Tony Stark — the engineer who builds his way out of every problem. I hope to become like him one day." |

**Verified:** All icon names exist in `lucide-react` (`ChessKnight`, `Dribbble`, `Zap`). If any
resolve to `undefined` at build time, fall back per the table.

### 2.1 Layout notes
- Keep the existing card style: `rounded-2xl border border-navy-600/50 hover:border-gold-500/30`,
  icon tile in a `w-12 h-12 rounded-xl bg-gold-500/10` box, hover scale + gold transition.
- Grid: `sm:grid-cols-2 lg:grid-cols-3 gap-6` — 3 hobbies fill one clean row on desktop.
- Keep framer-motion `whileInView` reveal animations with staggered delay.

---

## 3. Books — "Books I've Finished" Carousel

### 3.1 Hybrid grouping (confirmed)

**Series cards** (one card each; clicking opens a popup listing every book in the series):

| Series | Representative cover (ISBN) | Books in series (popup list) |
|--------|------------------------------|------------------------------|
| **The Hunger Games** (Suzanne Collins) | `9780439023481` | ① The Hunger Games ② Catching Fire ③ Mockingjay |
| **A Song of Ice and Fire / Game of Thrones** (G.R.R. Martin) | `9780553386790` | ① A Game of Thrones ② A Clash of Kings ③ A Storm of Swords ④ A Feast for Crows ⑤ A Dance with Dragons — *published books only* |
| **Harry Potter** (J.K. Rowling) | `9780747532699` | ① Sorcerer's Stone ② Chamber of Secrets ③ Prisoner of Azkaban ④ Goblet of Fire ⑤ Order of the Phoenix ⑥ Half-Blood Prince ⑦ Deathly Hallows |
| **The Dark Tower** (Stephen King) | `9780452284692` (The Gunslinger) | ① The Gunslinger ② The Drawing of the Three ③ The Waste Lands ④ Wizard and Glass ⑤ Wolves of the Calla ⑥ Song of Susannah ⑦ The Dark Tower ⑧ The Wind Through the Keyhole |

**Individual book cards:**

| Book | Author | ISBN (verified) |
|------|--------|-----------------|
| **The Partner** | John Grisham | `9780440238139` |
| **The Associate** | John Grisham | `9781401323228` |
| **The Broker** | John Grisham | `9780743464426` |
| **Inferno** ⭐ | Dan Brown | `9780385537858` — **FAVORITE** (gold badge on card) |
| **Dreamcatcher** | Stephen King | `9780684868208` |

Total: **4 series cards + 5 individual cards = 9 carousel slides.**

### 3.2 Book cover images — real covers via Open Library (confirmed)

- Use the free, keyless covers API: `https://covers.openlibrary.org/b/isbn/{ISBN}-L.jpg`
- **Hotlink** (do NOT download into `public/`) — keeps repo small and covers always current.
- Verified working via curl: ISBNs above return `200`/`302` (302 = redirect to the actual cover,
  browsers follow it automatically).
- `-L.jpg` (large) for carousel cards & popup; optionally `-M.jpg` in popup to save bandwidth.
- **Fallback:** if a cover fails to load (`onError`), swap to the current stylized gradient cover
  (existing `book.gradient` pattern) so the layout never shows a broken image.

### 3.3 Carousel behavior (confirmed)

| Setting | Value |
|---------|-------|
| Cards visible, desktop (lg+) | **3** — center highlighted |
| Cards visible, mobile | **1** (single centered card) |
| Center emphasis | **Coverflow**: center card larger + full opacity; side cards scaled down + dimmed |
| Autoplay | **Yes**, ~4s interval; **pauses on hover** (or when a popup is open) |
| Manual controls | Arrow buttons (left/right) **and** drag/swipe on touch |
| Click a card | **Opens a detail popup** (bring-to-center happens implicitly as part of the flow) |
| Keyboard | Optional nicety: ←/→ arrows + Esc to close popup (see §5) |

### 3.4 Data model (per slide)

```js
{
  type: 'series' | 'book',
  title: 'Harry Potter',            // series name or book title
  author: 'J.K. Rowling',
  isbn: '9780747532699',            // representative cover
  favorite: false,                  // true only for Inferno
  note: 'One-line "why I loved it" (drafted by Buffy, user can tweak)',
  books: [                          // series only — null for individual books
    { title: 'Sorcerer\'s Stone', isbn: '9780747532699' },
    // ... one entry per book in the series
  ]
}
```

### 3.5 Detail popup (confirmed)

- Opens on card click (framer-motion `AnimatePresence` modal, same pattern as BlogSection's
  Instagram-style modal).
- Contains: **large cover image**, title / author, and for series — the **full list of books with
  their own small covers**; plus the one-line note.
- Esc key + backdrop click close the popup; body scroll locks while open (reuse the existing
  scroll-lock approach from BlogSection).
- **Inferno:** gold **★ FAVORITE** badge sits on the carousel card itself (not inside the popup).

### 3.6 Book notes (confirmed)

Drafted by Buffy, editable by user. Suggested one-liners:

- **Inferno** — "The book that made me love the puzzle-thriller genre — a code-cracking, art-history
  chase I finished in days."
- **Grisham trilogy** — "Three back-to-back legal thrillers that showed me how a single decision
  can ripple through everything."
- **Hunger Games** — "Strategy, survival, and systems under pressure — read the whole trilogy."
- **Game of Thrones** — "All five published books — world-building on a scale I didn't know existed."
- **Harry Potter** — "Grew up with all seven — the original reason I got hooked on long stories."
- **Dark Tower** — "King's magnum opus — the Gunslinger alone made me chase all eight books."

---

## 4. Responsiveness (confirmed)

- **Desktop (lg+):** 3 cards, coverflow (center = scale ~1.0–1.05 full color; sides scale ~0.8,
  opacity ~0.5–0.6, slight z-index layering).
- **Tablet (sm–md):** 3 cards if space allows, else 1–2; simplest safe rule: keep 3 ≥ `md`, 1 below.
- **Mobile (< md):** 1 centered card, swipe to navigate. No peek (user picked plain 1-card, not peek).
- Ensure arrows stay clickable on mobile and touch-drag doesn't fight vertical page scroll
  (use horizontal swipe detection with a threshold).

---

## 5. Implementation checklist

1. [ ] Rewrite `hobbies` array in `PersonalSection.jsx` → 3 real hobbies (§2).
2. [ ] Delete the `books` "currently reading" array; add new `finishedBooks` data (§3.4) with
      9 slides: 4 series + 5 individual (Inferno `favorite: true`).
3. [ ] Build the coverflow carousel component (3 visible / 1 visible logic, autoplay w/ pause-on-hover,
      arrows, drag/swipe, center scale + dim sides).
4. [ ] Add Open Library cover URLs + `onError` fallback to gradient covers.
5. [ ] Add detail popup (AnimatePresence, Esc close, backdrop close, scroll lock, series book list).
6. [ ] Add gold **★ FAVORITE** badge on Inferno card.
7. [ ] Update section copy: heading still "Beyond the code." but books block becomes
      "Books I've finished." / drop "CURRENTLY READING · UPDATED 2026" wording; adjust intro line.
8. [ ] Keep the "Send me a recommendation" email link at the bottom.
9. [ ] Validate: `npm run build` passes; browser-check at `vite preview` — no broken covers
      (fallbacks kick in), carousel behaves on desktop + mobile viewport, popup opens/closes.

---

## 6. Constraints & notes

- **No new dependencies** required — carousel built with existing framer-motion + React state.
- **No backend** — all data hardcoded in the component (consistent with the static portfolio).
- Keep the existing visual language: navy-900 background, gold-400 accents, `glass` cards,
  `font-serif` titles, framer-motion reveals.
- Section id stays `personal`; nav label stays "Personal"; no App.jsx / Navigation changes needed.
- The `README`/`blog-meta.json` etc. are untouched.
- After implementation, commit + push to `github.com/Kidus-Sofonias/Portfolio` (user deploys to Vercel).

## 7. Out of scope (not requested)

- Adding more than the 3 hobbies.
- Ratings (e.g., 4.5/5 stars) per book — not requested; only the favorite badge on Inferno.
- Downloading covers into the repo — hotlinking confirmed.
- Expanding beyond the listed books/series.
