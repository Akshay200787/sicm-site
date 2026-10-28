# Standard Indian Citation Manual — website

Static site, one page. Files:

- `index.html` — the whole site (styles and script inside). Edit the `CONFIG` block at the top of the `<script>` for prices, payment links, your domain and LinkedIn URL.
- `og.png` — the preview image LinkedIn and WhatsApp show when the link is shared.
- `robots.txt`, `sitemap.xml`, `.nojekyll` — housekeeping for search engines and GitHub Pages.

## Putting it on your domain (GitHub Pages, free, HTTPS included)

1. **Repository.** On github.com (account `Akshay200787`) create a repository named `sicm-site`, public, empty. Upload these files to it (drag the folder onto the repository page, or let Claude push them once the repository exists).
2. **Pages.** Repository → Settings → Pages → Build and deployment: Source "Deploy from a branch", branch `main`, folder `/ (root)`. Within a minute the site is live at `https://akshay200787.github.io/sicm-site/` (and at https://www.thesicm.in once the DNS records are in) (then at `https://www.thesicm.in` once DNS is set).
3. **Domain.** Buy the domain at any registrar (Cloudflare, Namecheap, GoDaddy, Hostinger; a `.in` costs about ₹600–1,200 a year, a `.com` about ₹1,000–1,500). In the registrar's DNS settings add:

   | Type  | Host | Value |
   |-------|------|-------|
   | A     | @    | 185.199.108.153 |
   | A     | @    | 185.199.109.153 |
   | A     | @    | 185.199.110.153 |
   | A     | @    | 185.199.111.153 |
   | AAAA  | @    | 2606:50c0:8000::153 |
   | AAAA  | @    | 2606:50c0:8001::153 |
   | AAAA  | @    | 2606:50c0:8002::153 |
   | AAAA  | @    | 2606:50c0:8003::153 |
   | CNAME | www  | akshay200787.github.io |

   (Records as published by GitHub, checked 28 October 2026.)
4. **Connect.** Repository → Settings → Pages → Custom domain: enter the domain, save. GitHub adds a `CNAME` file and checks the DNS; when the check passes (minutes to a few hours), tick **Enforce HTTPS**.
5. **Rebuild with the real address.** Run `node build-site.js https://yourdomain/` (or ask Claude) so the canonical link and the share image point at the domain, and set `siteUrl` in `CONFIG`. Upload the new `index.html`.

## Payments

Create payment links in Razorpay (or Stripe, Instamojo) for the student and scholar editions, with the PDF and the `.csl` file delivered by email on payment, and paste the links into `CONFIG.pay`. Until then the buy buttons show your email address.
