/* ==================================================================
   EASY-EDIT SETTINGS
   Everything you're likely to need to change lives in this block.
   Nothing else in this file needs to be touched.
   ================================================================== */

// Where "Email Jean directly" and the contact links should go.
const RECIPIENT_EMAIL = "jeanrecapet@gmail.com";

// The three retailer cards in the "Find it" section.
// Set the url for each one — leave as "#" until you have the real link.
const BUY_LINKS = [
  { name: "Barnes & Noble", url: "#", icon: "storefront" },
  { name: "Amazon",         url: "#", icon: "cart" },
  { name: "IngramSpark",    url: "#", icon: "book" },
];

// Social links shown in the Contact section.
// Add or remove lines here — icons are matched automatically by "icon".
// Supported icon names: instagram, facebook, x, linkedin, youtube, tiktok
const SOCIAL_LINKS = [
  { name: "Instagram", url: "#", icon: "instagram" },
  { name: "Facebook",  url: "#", icon: "facebook" },
];

/* ==================================================================
   ICONS
   Small inline SVGs — no external icon library needed.
   ================================================================== */
const ICONS = {
  storefront: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 9l1.5-5h15L21 9"/><path d="M3 9a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0"/><path d="M5 9v10h14V9"/><path d="M9 19v-6h6v6"/></svg>',
  cart:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6"/><circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/></svg>',
  book:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20"/></svg>',
  instagram:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>',
  facebook:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M15 8.5h2V5h-2.5A3.5 3.5 0 0 0 11 8.5V11H9v3h2v6h3v-6h2.4l.6-3H14V9a.5.5 0 0 1 .5-.5z"/></svg>',
  x:          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 4l16 16M20 4L4 20"/></svg>',
  linkedin:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7.5 10v6.5M7.5 7.5v.01M12 16.5V13a2 2 0 0 1 4 0v3.5M12 13v3.5"/></svg>',
  youtube:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="6" width="18" height="12" rx="3"/><path d="M10.5 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none"/></svg>',
  tiktok:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 4v9.5a3.5 3.5 0 1 1-3-3.46"/><path d="M14 4a5 5 0 0 0 5 5"/></svg>',
};

/* ==================================================================
   RENDER — builds the Find and Contact sections from the config above
   ================================================================== */
function renderFindSection() {
  const grid = document.getElementById('find-grid');
  grid.innerHTML = BUY_LINKS.map((item, i) => `
    <a class="find-card${i === 1 ? ' alt-card' : ''}" href="${item.url}" target="_blank" rel="noopener">
      <div class="find-icon">${ICONS[item.icon] || ICONS.book}</div>
      <div class="find-name">${item.name}</div>
      <div class="find-cta">Shop now &rarr;</div>
    </a>
  `).join('');
}

function renderSocialLinks() {
  const row = document.getElementById('social-row');
  row.innerHTML = SOCIAL_LINKS.map(item => `
    <li>
      <a href="${item.url}" target="_blank" rel="noopener">
        ${ICONS[item.icon] || ''}
        <span>${item.name}</span>
      </a>
    </li>
  `).join('');
}

function renderEmail() {
  document.getElementById('email-address').textContent = RECIPIENT_EMAIL;
}

// Contact form: builds a pre-filled email instead of submitting anywhere.
function setupContactForm() {
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    const subject = encodeURIComponent('Message from ' + name + ' via Safe Ground website');
    const body = encodeURIComponent(message + '\n\n— ' + name);

    window.location.href = 'mailto:' + RECIPIENT_EMAIL + '?subject=' + subject + '&body=' + body;
  });
}

renderFindSection();
renderSocialLinks();
renderEmail();
setupContactForm();
