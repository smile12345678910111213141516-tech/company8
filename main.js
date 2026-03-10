/* ══════════════════════════════════════════════
   main.js — Repowering Partners
══════════════════════════════════════════════ */


/* ── PAGE ROUTING ──────────────────────────── */

function showPage(id) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(function(p) {
    p.classList.remove('active');
  });

  // Show requested page
  var target = document.getElementById('page-' + id);
  if (target) target.classList.add('active');

  // Update pill nav active state
  document.querySelectorAll('.nav-center a').forEach(function(a) {
    a.classList.remove('active');
  });
  var activeNav = document.getElementById('nav-' + id);
  if (activeNav) activeNav.classList.add('active');

  // Always close mobile menu on navigation
  closeMobileMenu();

  // Scroll to top
  window.scrollTo(0, 0);

  // Reset form if leaving contact page
  if (id !== 'contact') {
    resetForm();
  }

  // Trigger animations for new page
  setTimeout(observeAnimations, 80);
}


/* ── MOBILE MENU ───────────────────────────── */

function openMobileMenu() {
  var nav = document.getElementById('mobileNav');
  var btn = document.getElementById('mobileMenuBtn');
  nav.style.display = 'flex';
  // Force reflow before adding open class so transition fires
  nav.getBoundingClientRect();
  nav.classList.add('open');
  btn.classList.add('open');
  btn.setAttribute('aria-expanded', 'true');
}

function closeMobileMenu() {
  var nav = document.getElementById('mobileNav');
  var btn = document.getElementById('mobileMenuBtn');
  nav.classList.remove('open');
  btn.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
  // Hide after transition completes
  setTimeout(function() {
    if (!nav.classList.contains('open')) {
      nav.style.display = 'none';
    }
  }, 320);
}

function toggleMobileMenu() {
  var nav = document.getElementById('mobileNav');
  if (nav.classList.contains('open')) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

// Close on outside tap
document.addEventListener('click', function(e) {
  var nav = document.getElementById('mobileNav');
  var btn = document.getElementById('mobileMenuBtn');
  if (
    nav &&
    nav.classList.contains('open') &&
    !nav.contains(e.target) &&
    !btn.contains(e.target)
  ) {
    closeMobileMenu();
  }
});

// Close on desktop resize
window.addEventListener('resize', function() {
  if (window.innerWidth > 960) {
    var nav = document.getElementById('mobileNav');
    var btn = document.getElementById('mobileMenuBtn');
    nav.classList.remove('open');
    btn.classList.remove('open');
    nav.style.display = 'none';
  }
});


/* ── NAV SCROLL ────────────────────────────── */

window.addEventListener('scroll', function() {
  var navbar = document.getElementById('navbar');
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  observeAnimations();
}, { passive: true });


/* ── SCROLL ANIMATIONS ─────────────────────── */

function currentPageId() {
  var active = document.querySelector('.page.active');
  return active ? active.id.replace('page-', '') : 'home';
}

function observeAnimations() {
  var pageEl = document.getElementById('page-' + currentPageId());
  if (!pageEl) return;

  var els = pageEl.querySelectorAll(
    '[data-animate]:not(.visible), [data-animate-left]:not(.visible), [data-animate-right]:not(.visible)'
  );

  els.forEach(function(el, i) {
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40 && rect.bottom > 0) {
      var delay = Math.min(i * 0.07, 0.4);
      el.style.transitionDelay = delay + 's';
      el.classList.add('visible');
    }
  });
}


/* ── CONTACT FORM ──────────────────────────── */

function handleSubmit(e) {
  e.preventDefault();

  var form    = document.getElementById('contactForm');
  var success = document.getElementById('successMsg');
  var firstName = document.getElementById('firstName');
  var email     = document.getElementById('email');

  if (!firstName || !firstName.value.trim()) {
    if (firstName) firstName.focus();
    return;
  }
  if (!email || !email.value.trim() || !email.validity.valid) {
    if (email) email.focus();
    return;
  }

  form.style.display = 'none';
  success.classList.add('show');
}

function resetForm() {
  var form    = document.getElementById('contactForm');
  var success = document.getElementById('successMsg');
  if (form)    { form.style.display = ''; form.reset(); }
  if (success) { success.classList.remove('show'); }
}


/* ── INIT ──────────────────────────────────── */

window.addEventListener('load', function() {
  // Hide mobile nav by default
  var nav = document.getElementById('mobileNav');
  if (nav) nav.style.display = 'none';

  // ARIA on hamburger
  var btn = document.getElementById('mobileMenuBtn');
  if (btn) {
    btn.setAttribute('aria-label', 'Toggle navigation menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'mobileNav');
  }

  // Initial animations
  setTimeout(observeAnimations, 100);
});