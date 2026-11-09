// Shared behaviour for every page: prices, payment buttons, addresses, footer.
(function () {
  const C = window.SICM || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const siteUrl = (C.siteUrl || location.origin).replace(/\/$/, '');

  // ₹ formatting in the Indian style: 1,49,000
  const inr = n => '₹' + Number(n).toLocaleString('en-IN', { maximumFractionDigits: 0 });
  window.SICM_inr = inr;

  function toast(msg) {
    const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t);
    setTimeout(() => t.remove(), 2600);
  }
  async function copyText(text, el) {
    try { await navigator.clipboard.writeText(text); toast('Copied'); }
    catch (e) {
      if (el) { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
      toast('Select and copy the text');
    }
  }

  // prices: <span data-price="student"></span> → ₹599 ; data-suffix adds a small unit
  $$('[data-price]').forEach(el => {
    const v = (C.prices || {})[el.dataset.price];
    if (v === undefined) return;
    const unit = el.dataset.unit;
    el.innerHTML = inr(v) + (unit ? `<small>${unit}</small>` : '');
  });
  // plain numbers: <span data-num="issueDays"></span>
  $$('[data-num]').forEach(el => { const v = C[el.dataset.num]; if (v !== undefined) el.textContent = v; });
  // email and address
  $$('[data-email]').forEach(el => { el.textContent = C.email || ''; if (el.tagName === 'A') el.href = 'mailto:' + C.email; });
  $$('[data-owner]').forEach(el => el.textContent = C.owner || '');
  $$('[data-city]').forEach(el => el.textContent = C.city || '');
  $$('[data-address]').forEach(el => el.textContent = C.postalAddress || C.city || '');
  $$('[data-phone]').forEach(el => { if (C.phone) { el.textContent = C.phone; el.hidden = false; } else { const row = el.closest('[data-phone-row]'); if (row) row.hidden = true; } });
  $$('[data-copy-email]').forEach(b => b.addEventListener('click', () => copyText(C.email)));
  if (C.linkedin) $$('[data-linkedin]').forEach(a => { a.href = C.linkedin; a.hidden = false; });
  $$('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  // payment buttons: <a class="btn primary" data-pay="student">Buy</a>
  // A connected Razorpay page becomes a real link; otherwise the button is disabled and says so.
  $$('[data-pay]').forEach(a => {
    const link = (C.pay || {})[a.dataset.pay];
    if (link) {
      a.href = link; a.target = '_blank'; a.rel = 'noopener';
      a.removeAttribute('aria-disabled');
    } else {
      a.removeAttribute('href'); a.setAttribute('aria-disabled', 'true'); a.setAttribute('disabled', '');
      a.title = 'Online payment for this item opens shortly.';
      const box = a.parentElement;
      if (box && !box.querySelector('.soon')) {
        const s = document.createElement('span'); s.className = 'soon'; s.textContent = 'Online payment opens shortly';
        box.appendChild(s);
      }
    }
  });

  // share links carry the site's address
  $$('[data-share-linkedin]').forEach(a => {
    a.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(siteUrl + (a.dataset.shareLinkedin || ''));
  });
  $$('[data-copy-link]').forEach(b => b.addEventListener('click', () => copyText(siteUrl + (b.dataset.copyLink || ''))));

  // open the section named in the link's hash
  try { const h = location.hash.slice(1); if (/^[A-Za-z0-9._~-]+$/.test(h) && document.getElementById(h)) document.getElementById(h).scrollIntoView(); } catch (e) {}
})();
