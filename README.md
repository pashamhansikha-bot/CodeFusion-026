# Ruchulu Junction 🛺 — Andhra & Telangana Drive-Thru Ordering

A multi-page, static drive-thru ordering site for an Indian (Telugu/Andhra) restaurant. Plain HTML/CSS/JS — **no build step, no framework, no backend** — which makes it the simplest possible thing to deploy on GitHub Pages.

## Pages
| Page | Purpose |
|---|---|
| `index.html` | Home — hero, category shortcuts, bestseller picks |
| `menu.html` | Full interactive menu — search, category tabs, veg/spicy/bestseller filters, item customization |
| `checkout.html` | Order type, pickup time slot, customer details, payment method, order summary |
| `track.html` | Live-feeling order progress (auto-rickshaw moving through 4 stages) + digital receipt |
| `about.html` | Restaurant story, highlights, location & hours |

Shared logic lives in `css/style.css`, `js/data.js` (menu data), `js/cart.js` (cart/theme/GST logic used on every page), and `js/customize.js` (the item-customization modal).

## Feature checklist
- Responsive UI across all 5 pages, shared nav + cart drawer
- 7 categories, 27 dishes with Telugu names, descriptions, and ₹ prices
- Interactive customization: portion size, spice level, add-ons, notes — per item
- Cart with quantity controls, live subtotal/GST/packaging/total, persisted in `localStorage` across pages
- Full checkout flow: Drive-Thru vs. Store Takeaway, 10-minute pickup slots, Cash / UPI / Card
- Order tracking page with animated progress and a generated order number + receipt
- **Extras:** search + dietary/bestseller filters, dynamic cart math, item customization, pickup slot selection, animated order progress, dark/light ("Night Junction" / "Daytime") mode toggle — all implemented

## Run locally
No install needed — just open `index.html` in a browser. (If your browser blocks `fetch`/module-style loading of local files, right-click → "Open with Live Server" in VS Code, or run `python3 -m http.server` in this folder and visit `http://localhost:8000`.)

## Deploy on GitHub Pages (recommended — free, and it's already what you asked for)
1. Create a new repository on GitHub, e.g. `ruchulu-junction`.
2. Push all files in this folder to the repo root, keeping the folder structure:
   ```
   index.html
   menu.html
   checkout.html
   track.html
   about.html
   css/style.css
   js/data.js
   js/cart.js
   js/customize.js
   ```
   ```bash
   git init
   git add .
   git commit -m "Ruchulu Junction drive-thru ordering site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/ruchulu-junction.git
   git push -u origin main
   ```
3. On GitHub: go to **Settings → Pages**.
4. Under "Build and deployment", set **Source: Deploy from a branch**, **Branch: `main` / `root`**.
5. Save. GitHub will give you a live URL within a minute or two, typically:
   `https://<your-username>.github.io/ruchulu-junction/`

That's it — no build command, no `dist` folder, nothing to configure. Since every link in the site is a relative path (`menu.html`, `css/style.css`, etc.), it works identically whether it's opened from disk or served from GitHub Pages.

### Alternative free hosts (if you want a backup link)
- **Netlify Drop** — https://app.netlify.com/drop — drag the folder in, get a URL instantly.
- **Vercel** — `vercel` CLI or dashboard import, same drag-and-drop static deploy.
