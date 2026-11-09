// SICM site settings: the one file to edit. Every page reads it.
// After editing, upload this file to the repository; nothing else needs changing.
window.SICM = {
  siteUrl: 'https://www.thesicm.in',
  email: 'info@thesicm.in',                 // where buyers write (GoDaddy Professional Email mailbox)
  owner: 'Akshay Sreevatsa',
  tradingAs: 'Standard Indian Citation Manual',
  city: 'Bengaluru, Karnataka, India',
  postalAddress: '',        // a postal address for the Contact page (a business or c/o address, not necessarily home); blank shows the city only
  phone: '',                // customer-care phone for the Contact page; blank hides it
  linkedin: '',             // your LinkedIn profile URL, shown in the footer when set
  issueDays: 2,             // working days to issue a personal digital copy after payment
  rosterDays: 5,            // working days to issue an institution's copies after its roster arrives
  dispatchDays: 10,         // working days to print, bind and dispatch a printed copy

  // Razorpay Payment Page links, one per product. Paste each link when the page exists.
  // A blank link shows the button as "Online payment opens shortly".
  pay: {
    student: '',
    scholar: '',
    printIndia: '',
    printAbroad: '',
    inst100: '', inst300: '', inst600: '', inst1200: '', instLarge: '',
    org25: '', org100: '', org250: '', orgLarge: '',
    library: '',
    session: ''
  },

  // Prices in rupees. Change a number here and every page follows.
  prices: {
    student: 599,
    scholar: 1799,
    printIndia: 2999,
    printAbroad: 5499,
    inst100: 39000, inst300: 89000, inst600: 149000, inst1200: 249000,
    instPerReader: 190,      // over 1,200 readers, per reader per year
    org25: 59000, org100: 149000, org250: 299000,
    orgPerReader: 950,       // over 250 readers, per reader per year
    library: 1999,           // per hardbound library copy, minimum 5
    libraryMin: 5,
    sessionOnline: 29000,
    sessionBengaluru: 49000,
    sessionIndia: 79000
  }
};
