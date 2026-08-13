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

   

