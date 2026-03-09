/* ══════════════════════════════════════════════
   main.js — Repowering Partners
══════════════════════════════════════════════ */


/* ── PAGE ROUTING ──────────────────────────── */

function showPage(id) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(function(p) {
    p.classList.remove('active');
  });

  // Show the requested page
  document.getElementById('page-' + id).classList.add('active');

  // Update nav pill active state
  document.querySelectorAll('.nav-center a[id^="nav-"]').forEach(function(a) {
    a.classList.remove('active');
  });
  var navEl = document.getElementById('nav-' + id);
  if (navEl) navEl.classList.add('active');

  // Close mobile menu if open
  document.getElementById('mobileNav').classList.remove('open');

  // Scroll to top
  window.scrollTo({ top: 0 });

  // Trigger animations after page switches
  setTimeout(observeAnimations, 80);
}


/* ── MOBILE MENU ───────────────────────────── */

function toggleMobileMenu() {
  document.getElementById('mobileNav').classList.toggle('open');
}


/* ── NAV SCROLL STYLE ──────────────────────── */

window.addEventListener('scroll', function() {
  var navbar = document.getElementById('navbar');
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  observeAnimations();
});


/* ── SCROLL ANIMATIONS ─────────────────────── */

function currentPage() {
  var active = document.querySelector('.page.active');
  return active ? active.id.replace('page-', '') : 'home';
}

function observeAnimations() {
  var page = document.getElementById('page-' + currentPage());
  if (!page) return;

  var animatedEls = page.querySelectorAll(
    '[data-animate], [data-animate-left], [data-animate-right]'
  );

  animatedEls.forEach(function(el, i) {
    if (!el.classList.contains('visible')) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 40 && rect.bottom > 0) {
        el.style.transitionDelay = (i * 0.06) + 's';
        el.classList.add('visible');
      }
    }
  });
}


/* ── CONTACT FORM ──────────────────────────── */

function handleSubmit(e) {
  e.preventDefault();
  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('successMsg').classList.add('show');
}


/* ── INIT ON LOAD ──────────────────────────── */

window.addEventListener('load', function() {
  setTimeout(observeAnimations, 100);
});