/* ══════════════════════════════════════════════
   main.js — Repowering Partners
══════════════════════════════════════════════ */


/* ── PAGE ROUTING ──────────────────────────── */

function showPage(id) {
  // Hide all pages
  var pages = document.querySelectorAll('.page');
  pages.forEach(function(p) {
    p.classList.remove('active');
  });

  // Show requested page
  var target = document.getElementById('page-' + id);
  if (target) target.classList.add('active');

  // Update pill nav active state
  var navLinks = document.querySelectorAll('.nav-center a[id^="nav-"]');
  navLinks.forEach(function(a) {
    a.classList.remove('active');
  });
  var activeNav = document.getElementById('nav-' + id);
  if (activeNav) activeNav.classList.add('active');

  // Close mobile menu
  closeMobileMenu();

  // Scroll to top instantly
  window.scrollTo(0, 0);

  // Reset form if navigating away from contact
  if (id !== 'contact') {
    resetForm();
  }

  // Kick off animations for the new page
  setTimeout(observeAnimations, 80);
}


/* ── MOBILE MENU ───────────────────────────── */

function toggleMobileMenu() {
  var nav    = document.getElementById('mobileNav');
  var btn    = document.getElementById('mobileMenuBtn');
  var isOpen = nav.classList.contains('open');

  if (isOpen) {
    closeMobileMenu();
  } else {
    nav.classList.add('open');
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
}

function closeMobileMenu() {
  var nav = document.getElementById('mobileNav');
  var btn = document.getElementById('mobileMenuBtn');
  nav.classList.remove('open');
  btn.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
}

// Close mobile menu if user taps outside it
document.addEventListener('click', function(e) {
  var nav = document.getElementById('mobileNav');
  var btn = document.getElementById('mobileMenuBtn');
  if (
    nav.classList.contains('open') &&
    !nav.contains(e.target) &&
    !btn.contains(e.target)
  ) {
    closeMobileMenu();
  }
});

// Close mobile menu on resize back to desktop
window.addEventListener('resize', function() {
  if (window.innerWidth > 960) {
    closeMobileMenu();
  }
});


/* ── NAV SCROLL STYLE ──────────────────────── */

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
    var inView = rect.top < window.innerHeight - 40 && rect.bottom > 0;
    if (inView) {
      // Stagger delay capped at 0.4s so last items don't wait too long
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

  // Basic validation
  var firstName = document.getElementById('firstName');
  var email     = document.getElementById('email');

  if (!firstName.value.trim()) {
    firstName.focus();
    return;
  }
  if (!email.value.trim() || !email.validity.valid) {
    email.focus();
    return;
  }

  // Hide form, show success
  form.style.display = 'none';
  success.classList.add('show');
}

function resetForm() {
  var form    = document.getElementById('contactForm');
  var success = document.getElementById('successMsg');
  if (form)    form.style.display = '';
  if (success) success.classList.remove('show');
  if (form)    form.reset();
}


/* ── KEYBOARD ACCESSIBILITY ────────────────── */

// Allow Enter/Space to trigger nav links and footer links
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    var el = e.target;
    if (el.tagName === 'A' && el.getAttribute('onclick')) {
      e.preventDefault();
      el.click();
    }
  }
});


/* ── INIT ──────────────────────────────────── */

window.addEventListener('load', function() {
  // Run animations for above-the-fold elements
  setTimeout(observeAnimations, 100);

  // Set aria attributes on mobile menu button
  var btn = document.getElementById('mobileMenuBtn');
  if (btn) {
    btn.setAttribute('aria-label', 'Toggle navigation menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'mobileNav');
  }
});