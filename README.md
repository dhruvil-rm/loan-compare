# ON-TAP SOLUTION-style Loan Comparison Website

React + Vite clone of the loan-comparison site UI (personal / auto / student loans),
built as a fully dynamic, data-driven, responsive app.

## Run it

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

Production build:

```bash
npm run build
npm run preview
```

## Structure

```
src/
  components/
    navbar/        navbar.jsx, navbar.css      - top nav, search box, mobile menu (no login/signup)
    footer/        footer.jsx, footer.css      - multi-column footer with real site page links
    hero/          hero.jsx, hero.css          - homepage hero, loan-type tabs, feature cards
    loanfilter/     loanfilter.jsx, loanfilter.css - reusable pill-tab filter (used in hero + search)
    loancard/       loancard.jsx, loancard.css  - the reusable loan card used on every page
    blogcard/       blogcard.jsx, blogcard.css  - reusable blog preview card (with image support)
    scrolltotop/    scrolltotop.jsx, scrolltotop.css - resets scroll on route change + floating "back to top" button
  pages/
    home/           home.jsx, home.css          - "/" -- hero, Recently added, Latest from the blog
    search/         search.jsx, search.css      - "/search" -- amount slider, category filter, results grid
    blog/           blog.jsx, blog.css          - "/blog" -- featured post, all posts, trending items
    blogdetail/     blogdetail.jsx, blogdetail.css - "/blog/:slug" -- full article, related loans/articles
    itemdetail/     itemdetail.jsx, itemdetail.css - "/item/:id" -- single loan detail page
  data/
    loans.js         loans + categories + loan-type tabs + helpers (getLoanById, formatAPR)
    blogPosts.js      blog posts + getBlogBySlug -- kept in its own file, separate from loans.js
  App.jsx             routes + ScrollToTop mount point
  main.jsx            React Router + app bootstrap
  index.css            design tokens (colors, spacing) + global resets + shared .card-grid utility
public/
  images/blog/        drop blog images here (see public/images/blog/README.md for filenames)
```

## What's dynamic

- Every card on every page (`LoanCard`, `BlogCard`) is rendered from `src/data/loans.js` /
  `src/data/blogPosts.js` -- add or edit an entry there and it updates everywhere it appears
  (home, search, blog, item detail "similar options", blog detail "you might also like").
- `/search` reflects its filters in the URL (`?loan_type=personal&amount=250000&q=...`), same
  as the live site -- changing the amount slider or category tab updates the URL live.
- `/item/:id` and `/blog/:slug` read the id/slug from the URL and pull the matching record
  from the data files; an unknown id/slug redirects back to a safe page instead of crashing.
- Blog "comparison" articles (e.g. HDFC vs ICICI vs Axis) use a `groups` structure in
  `blogPosts.js`: each group has a heading/intro/disclaimer and a list of items, where each
  item pairs a paragraph with a `LoanCard` and an optional article-only badge (e.g.
  "Editor's Pick") that shows only inside that article, not on the card everywhere else.

## Blog images

Each post in `blogPosts.js` has an `image` field, e.g.:

```js
image: "/images/blog/choosing-the-right-car-loan-this-june.jpg",
```

Drop a matching file into `public/images/blog/` and it renders automatically on the blog
listing, the homepage "Latest from the blog" section, and the "More articles" cards. If the
file isn't there yet (or fails to load), the card falls back to a themed icon automatically --
nothing breaks.

## Icons

FontAwesome (`@fortawesome/react-fontawesome` + free-solid-svg-icons) is used throughout --
navbar search/menu icons, loan-type icons (car, motorcycle, graduation cap, bank), speed
lightning-bolt tags, the verdict/best-for/watch-out icons on the item detail page, and the
scroll-to-top arrow.

## Responsive / full width

- The shared `.card-grid` utility (`display: grid; grid-template-columns: repeat(auto-fill,
  minmax(290px, 1fr))`) is used for every card grid on the site, so columns reflow naturally
  with the available width instead of relying on fixed per-breakpoint column counts.
- The main content width was widened (1360px) and article/loan-detail pages use a narrower
  inner "prose" column for readable text while their related-content grids (`You might also
  like`, `Similar options`, `More articles`) stretch to the full page width.
- Breakpoints at 960px, 860px, 760px and 640px adjust padding, turn the navbar into a
  hamburger menu, and stack the search/amount controls vertically on small screens.

## Note on content

Loan names, APR ranges, amounts, tenures and speed tags mirror the reference screenshots.
Editorial copy (expert analysis, blog articles, verdicts) has been written fresh for this
build rather than copied verbatim, since that text is the original site's copyrighted
editorial content -- swap in your own real copy before using this for anything but a UI demo.
