/* ==================================================================
   SAFE GROUND — IMPRESSIVE LITERARY AUTHOR WEBSITE SCRIPT ENGINE
   Author: Jean Récapet | Memoir: Safe Ground
   ================================================================== */

// Configuration Options
const RECIPIENT_EMAIL = "jeanrecapet@gmail.com";

const BUY_LINKS = [
  { name: "Barnes & Noble", format: "Hardcover & Paperback", url: "#", icon: "storefront" },
  { name: "Amazon",         format: "Kindle & Paperback",    url: "#", icon: "cart" },
  { name: "IngramSpark",    format: "Independent Retailers", url: "#", icon: "book" },
];

const SOCIAL_LINKS = [
  { name: "Instagram", url: "#", icon: "instagram" },
  { name: "Facebook",  url: "#", icon: "facebook" },
];

/* SVG Icon Library */
const ICONS = {
  storefront: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 9l1.5-5h15L21 9"/><path d="M3 9a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0"/><path d="M5 9v10h14V9"/><path d="M9 19v-6h6v6"/></svg>',
  cart:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6"/><circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/></svg>',
  book:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20"/></svg>',
  instagram:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>',
  facebook:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M15 8.5h2V5h-2.5A3.5 3.5 0 0 0 11 8.5V11H9v3h2v6h3v-6h2.4l.6-3H14V9a.5.5 0 0 1 .5-.5z"/></svg>',
  arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>'
};

document.addEventListener('DOMContentLoaded', () => {
  initRenderDynamicData();
  initHeaderScrollProgress();
  initScrollAnimations();
  initHero3DBookPhysics();
  initInteractive3DShowcase();
  initCustomCursor();
  initMobileNavigation();
  initContactForm();
  initBackToTop();
});

/* 1. Dynamic Content Renderer */
function initRenderDynamicData() {
  // Retailers
  const findGrid = document.getElementById('retailers-grid');
  if (findGrid) {
    findGrid.innerHTML = BUY_LINKS.map(item => `
      <a class="retailer-card" href="${item.url}" target="_blank" rel="noopener">
        <div class="retailer-info">
          <div class="retailer-icon">${ICONS[item.icon] || ICONS.book}</div>
          <div>
            <div class="retailer-name">${item.name}</div>
            <div class="retailer-format">${item.format}</div>
          </div>
        </div>
        <div class="retailer-cta-arrow">
          <span>Shop</span>
          ${ICONS.arrowRight}
        </div>
      </a>
    `).join('');
  }

  // Social Links
  const socialRow = document.getElementById('social-row');
  if (socialRow) {
    socialRow.innerHTML = SOCIAL_LINKS.map(item => `
      <li>
        <a href="${item.url}" target="_blank" rel="noopener">
          ${ICONS[item.icon] || ''}
          <span>${item.name}</span>
        </a>
      </li>
    `).join('');
  }

  // Email Placeholder
  const emailEl = document.getElementById('email-address');
  if (emailEl) emailEl.textContent = RECIPIENT_EMAIL;
}

/* 2. Header & Scroll Progress */
function initHeaderScrollProgress() {
  const header = document.getElementById('main-header');
  const progressBar = document.getElementById('scroll-progress');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY;

    // Progress bar update
    if (progressBar && totalScroll > 0) {
      const progress = (currentScroll / totalScroll) * 100;
      progressBar.style.width = `${progress}%`;
    }

    // Header styling shift
    if (header) {
      if (currentScroll > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Section active state
    let currentSectionId = '';
    sections.forEach(sec => {
      const secTop = sec.offsetTop - 120;
      const secHeight = sec.offsetHeight;
      if (currentScroll >= secTop && currentScroll < secTop + secHeight) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* 3. Scroll Reveal Animations */
function initScrollAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    observer.observe(el);
  });
}

/* 4. Hero 3D Book Cursor Tilt Physics */
function initHero3DBookPhysics() {
  const bookStage = document.getElementById('hero-book-stage');
  const book3D = document.getElementById('hero-book-3d');
  if (!bookStage || !book3D) return;

  let mouseX = 0, mouseY = 0;
  let currentRotX = 8, currentRotY = -22;
  let targetRotX = 8, targetRotY = -22;

  window.addEventListener('mousemove', (e) => {
    const rect = bookStage.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = (e.clientX - centerX) / (window.innerWidth / 2);
    const normY = (e.clientY - centerY) / (window.innerHeight / 2);

    targetRotY = -22 + normX * 18;
    targetRotX = 8 - normY * 18;
  });

  function animateTilt() {
    // Smooth Lerp
    currentRotX += (targetRotX - currentRotX) * 0.08;
    currentRotY += (targetRotY - currentRotY) * 0.08;

    book3D.style.transform = `rotateY(${currentRotY}deg) rotateX(${currentRotX}deg)`;
    requestAnimationFrame(animateTilt);
  }
  animateTilt();
}

/* 5. Interactive 3D Showcase Drag Controller */
function initInteractive3DShowcase() {
  const container = document.getElementById('interactive-3d-wrapper');
  const book = document.getElementById('interactive-book-3d');
  if (!container || !book) return;

  let isDragging = false;
  let startX = 0, startY = 0;
  let rotX = 10, rotY = -25;
  let targetRotX = 10, targetRotY = -25;

  const onStart = (e) => {
    isDragging = true;
    startX = e.clientX || e.touches[0].clientX;
    startY = e.clientY || e.touches[0].clientY;
  };

  const onMove = (e) => {
    if (!isDragging) return;
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);

    const deltaX = x - startX;
    const deltaY = y - startY;

    targetRotY = rotY + deltaX * 0.5;
    targetRotX = rotX - deltaY * 0.5;
  };

  const onEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    rotX = targetRotX;
    rotY = targetRotY;
  };

  container.addEventListener('mousedown', onStart);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onEnd);

  container.addEventListener('touchstart', onStart, { passive: true });
  window.addEventListener('touchmove', onMove, { passive: true });
  window.addEventListener('touchend', onEnd);

  function renderLoop() {
    if (book) {
      book.style.transform = `rotateY(${targetRotY}deg) rotateX(${targetRotX}deg)`;
    }
    requestAnimationFrame(renderLoop);
  }
  renderLoop();
}

/* 6. Custom Cursor follower */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const dot = document.getElementById('custom-cursor-dot');
  if (!cursor || !dot) return;

  let posX = 0, posY = 0;
  let targetX = 0, targetY = 0;

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    dot.style.transform = `translate(${targetX}px, ${targetY}px)`;
  });

  function renderCursor() {
    posX += (targetX - posX) * 0.2;
    posY += (targetY - posY) * 0.2;
    cursor.style.transform = `translate(${posX}px, ${posY}px)`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();
}

/* 7. Mobile Navigation */
function initMobileNavigation() {
  const toggle = document.getElementById('mobile-nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('is-open');
    if (isOpen) {
      navLinks.classList.remove('is-open');
      toggle.classList.remove('is-active');
      document.body.style.overflow = '';
    } else {
      navLinks.classList.add('is-open');
      toggle.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      toggle.classList.remove('is-active');
      document.body.style.overflow = '';
    });
  });
}

/* 8. Contact Form */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('contact-name');
    const messageInput = document.getElementById('contact-message');

    const name = nameInput ? nameInput.value : '';
    const message = messageInput ? messageInput.value : '';

    const subject = encodeURIComponent(`Message from ${name} via Safe Ground Website`);
    const body = encodeURIComponent(`${message}\n\n— ${name}`);

    window.location.href = `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
  });
}

/* 9. Back to Top */
function initBackToTop() {
  const backTopBtn = document.getElementById('btn-back-top');
  if (!backTopBtn) return;

  backTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
