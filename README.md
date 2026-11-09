# Standard Indian Citation Manual — website

Static site on GitHub Pages at https://www.thesicm.in (custom domain in `CNAME`; `.nojekyll` keeps Pages from processing it).

## Files

| File | What it is |
| --- | --- |
| `index.html` | The home page: free chapter, editions, printed copies, institution and organisation licences, lectures, author. |
| `pricing.html`, `terms.html`, `licence.html`, `privacy.html`, `refunds.html`, `shipping.html`, `contact.html`, `thanks.html` | The document pages. Pages serves each at its bare name: `/terms`, `/pricing`… |
| `config.js` | **The one file to edit.** Prices, Razorpay payment-page links, delivery times, email, address. Every page reads it. |
| `site.css`, `site.js` | Shared styles and behaviour (prices, payment buttons, addresses, footer). |
| `og.png` | Preview image for LinkedIn and WhatsApp. |
| `robots.txt`, `sitemap.xml` | Search-engine housekeeping. |
| `tools/build-pages.py` | Regenerates the document pages from their source text (`tools/page.py` is the shared skeleton). Only needed when the policy text changes. |

## Changing prices or connecting payments

Edit `config.js` and upload it. A payment button with a link in `config.pay` becomes a live link; a blank one shows "Online payment opens shortly". Prices in `config.prices` drive the cards, the pricing page and the licence schedule.

## The payment pages (Razorpay)

One Razorpay Payment Page per product, fixed amount, with the fields that personalise the copy (name on the copy; postal address for printed copies; institution and contact for licences). The terms link on each page is `https://www.thesicm.in/terms` (individuals) or `https://www.thesicm.in/licence` (licences), and the redirect after payment is `https://www.thesicm.in/thanks?for=digital|print|licence|library|session`.

## Issuing copies

Every copy is made with the private **SICM Copy Desk** (not in this repository): it stamps the master PDF with the buyer's name, copy number and hidden marks, records the copy in the register, and traces leaked copies.
