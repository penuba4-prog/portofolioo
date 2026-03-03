/* ===== LOADER ===== */
window.addEventListener('load', function() {
  setTimeout(function() {
    document.getElementById('loader').classList.add('hidden');
  }, 2000);
});

/* ===== THEME TOGGLE ===== */
var html = document.documentElement;
var themeBtn = document.getElementById('theme-toggle');
var theme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', theme);
themeBtn.textContent = theme === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
themeBtn.addEventListener('click', function() {
  theme = theme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeBtn.textContent = theme === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
});

/* ===== NAVBAR SCROLL ===== */
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  document.getElementById('back-top').classList.toggle('visible', window.scrollY > 400);
});

/* ===== ACTIVE NAV LINK ===== */
var sections = document.querySelectorAll('section[id]');
var navLinks = document.querySelectorAll('.nav-link');
var secObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      navLinks.forEach(function(l) { l.classList.remove('active'); });
      var active = document.querySelector('.nav-link[href="#' + e.target.id + '"]');
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(function(s) { secObserver.observe(s); });

/* ===== MOBILE MENU ===== */
var hamburger = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobile-menu');
var closeMenuBtn = document.getElementById('close-menu');
hamburger.addEventListener('click', function() { mobileMenu.classList.add('open'); });
closeMenuBtn.addEventListener('click', function() { mobileMenu.classList.remove('open'); });
document.querySelectorAll('.mob-link').forEach(function(l) {
  l.addEventListener('click', function() { mobileMenu.classList.remove('open'); });
});

/* ===== TYPEWRITER ===== */
var names = ['Fernando Kie', 'a Developer', 'a Tech Enthusiast', 'a Problem Solver'];
var ni = 0, ci = 0, deleting = false;
var typedEl = document.getElementById('typewriter');

function typeWriter() {
  var current = names[ni];
  if (!deleting) {
    typedEl.textContent = current.substring(0, ci + 1);
    ci++;
    if (ci === current.length) { deleting = true; setTimeout(typeWriter, 1800); return; }
  } else {
    typedEl.textContent = current.substring(0, ci - 1);
    ci--;
    if (ci === 0) { deleting = false; ni = (ni + 1) % names.length; }
  }
  setTimeout(typeWriter, deleting ? 60 : 100);
}
setTimeout(typeWriter, 2400);

/* ===== REVEAL ON SCROLL ===== */
var revealItems = document.querySelectorAll('.reveal');
var revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      e.target.querySelectorAll('.bar-fill').forEach(function(bar) {
        bar.style.width = bar.getAttribute('data-width') + '%';
      });
    }
  });
}, { threshold: 0.15 });
revealItems.forEach(function(el) { revealObserver.observe(el); });

/* ===== PROJECT FILTER ===== */
var filterBtns = document.querySelectorAll('.filter-btn');
var projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    filterBtns.forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    var filter = btn.getAttribute('data-filter');
    projectCards.forEach(function(card) {
      var cat = card.getAttribute('data-cat');
      if (filter === 'all' || cat === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ===== BLOG ARTICLES ===== */
var articles = {
  perf: {
    title: 'How I Cut Website Load Time from 4.3s to 1.1s',
    content: '<p>One of my biggest wins: taking a client website from 4.3 seconds down to 1.1 seconds. Here is exactly what I did.</p><p><strong>1. Image Optimization with WebP</strong> - Converting all images to WebP reduced image payload by around 40%. I used lazy loading for all below-the-fold images.</p><p><strong>2. CSS and JS Minification</strong> - Removed all whitespace and redundant code. Combined multiple files into single bundles to reduce HTTP requests.</p><p><strong>3. Browser Caching</strong> - Added cache-control headers for static assets so returning visitors get near-instant loads.</p><p><strong>4. Critical CSS Inlining</strong> - Identified above-the-fold CSS and inlined it to eliminate render-blocking for the initial viewport.</p><p>The result: GTmetrix grade went from C to A, PageSpeed score jumped from 61 to 97, and the client reported much better engagement from mobile users.</p>'
  },
  design: {
    title: 'Why I Always Build Mobile-First',
    content: '<p>When I started out, I built desktop layouts first, then tried to squeeze them into mobile. It was a disaster. Here is what changed my mind.</p><p><strong>The Numbers</strong> - Over 60% of global web traffic comes from mobile. If your site is not great on mobile, you are failing the majority of your visitors.</p><p><strong>What Mobile-First Really Means</strong> - It is not just "make it responsive." Mobile-first means starting with styles for the smallest screens, then using min-width media queries to progressively enhance for larger screens. This forces you to prioritize what truly matters.</p><p><strong>The Workflow</strong> - 1) Sketch the mobile layout in Figma. 2) Build the mobile CSS baseline. 3) Add tablet breakpoints at 768px. 4) Add desktop enhancements at 1024px+. 5) Test on real devices, not just browser DevTools.</p><p>Mobile-first forces you to cut the fluff. If something does not work on a 375px screen, it probably does not need to be there.</p>'
  },
  framework: {
    title: 'HTML, CSS, JS: Do You Really Need a Framework?',
    content: '<p>Every time I post about vanilla JS, someone asks "but why not use React?" Here is my honest answer after building dozens of client projects.</p><p><strong>When Vanilla Wins</strong> - For most small-to-medium business websites, a framework adds more complexity than it solves. A portfolio site, a landing page, a service website do not need component state management. They need fast load times and clean code.</p><p><strong>The Real Cost</strong> - React adds ~130KB to your bundle just for the runtime. For a simple site, that is massive overhead. A vanilla site with clean code will almost always outperform a React site on first load metrics.</p><p><strong>When Frameworks Make Sense</strong> - Complex web apps with lots of interactive state, real-time data, user authentication, dashboards: this is where React and Vue genuinely help.</p><p>My rule: if your client does not need a web app, they probably do not need a framework.</p>'
  },
  git: {
    title: 'Git Workflow That Actually Saves Your Life',
    content: '<p>I learned Git the hard way: by losing code, breaking production, and merging chaos. Here is the workflow that keeps every project sane.</p><p><strong>Branch Naming</strong> - I use: main (production), dev (integration), feature/name, fix/name. Never commit directly to main.</p><p><strong>Commit Messages</strong> - I follow a simplified Conventional Commits style: feat:, fix:, style:, docs:, refactor:. This makes git log actually readable and helps debug regressions.</p><p><strong>Pre-Push Checklist</strong> - Before pushing to dev: run linting, test responsiveness on 3 breakpoints, check the console for errors. Before merging to main: full cross-browser test, Lighthouse audit, client sign-off.</p><p>This workflow has saved me from breaking client sites in production multiple times. It adds 10 minutes of discipline and saves hours of panic.</p>'
  },
  ux: {
    title: '5 UX Mistakes That Kill Conversions',
    content: '<p>After reviewing dozens of client websites, the same UX mistakes keep showing up. Here are the 5 most common and how to fix them.</p><p><strong>1. No Clear CTA Above the Fold</strong> - Visitors decide in 3 seconds whether to stay. If your primary call-to-action is not immediately visible, you are losing leads. Fix: Put your most important CTA in the hero section with strong contrast.</p><p><strong>2. Too Many Choices</strong> - More choices means more time to decide means higher bounce rate. Fix: Limit navigation to 5-6 items max.</p><p><strong>3. Slow Load Time</strong> - Every 1-second delay reduces conversions by around 7%. Fix: Optimize images, use WebP, minimize third-party scripts.</p><p><strong>4. Non-Mobile Friendly Forms</strong> - Mobile users abandon forms with tiny inputs and hard-to-tap buttons. Fix: Minimum 44x44px tap targets, use appropriate input types.</p><p><strong>5. No Social Proof</strong> - People trust other people. A website without testimonials leaves visitors unconvinced. Fix: Add 2-3 real client quotes.</p>'
  },
  freelance: {
    title: 'How to Price Your Freelance Web Dev Services',
    content: '<p>Pricing is where most beginner freelancers either undersell themselves into burnout or overprice themselves out of clients. Here is my framework.</p><p><strong>Step 1: Know Your Baseline</strong> - Calculate your minimum hourly rate: (monthly expenses + desired profit) divided by billable hours. Never go below this number.</p><p><strong>Step 2: Scope Clearly</strong> - Vague projects lead to scope creep and unpaid overtime. Always define: number of pages, revisions included, what is in vs out of scope, timeline.</p><p><strong>Step 3: Price the Outcome</strong> - A client does not care how long it takes, they care about results. A landing page that generates leads is worth more than hours of your time at minimum wage.</p><p><strong>Step 4: Package Your Services</strong> - Offer 3 tiers: Starter (landing page), Standard (multi-page + SEO), Premium (custom design + maintenance). This simplifies client decisions.</p><p>As you build a portfolio and reputation, raise your rates. Clients who respect your work will pay for quality.</p>'
  }
};

/* ===== BLOG MODAL ===== */
var modal = document.getElementById('blog-modal');
var modalContent = document.getElementById('modal-content');
var closeModalBtn = document.getElementById('close-modal');

function openArticle(id) {
  var article = articles[id];
  if (article) {
    modalContent.innerHTML = '<h2>' + article.title + '</h2>' + article.content;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

document.querySelectorAll('.read-more').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    openArticle(btn.getAttribute('data-id'));
  });
});
document.querySelectorAll('.blog-card').forEach(function(card) {
  card.addEventListener('click', function() {
    openArticle(card.getAttribute('data-article'));
  });
});
closeModalBtn.addEventListener('click', function() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
});
modal.addEventListener('click', function(e) {
  if (e.target === modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ===== CONTACT FORM ===== */
document.getElementById('send-btn').addEventListener('click', function() {
  var name = document.getElementById('form-name').value.trim();
  var email = document.getElementById('form-email').value.trim();
  var message = document.getElementById('form-message').value.trim();
  var status = document.getElementById('form-status');

  if (!name || !email || !message) {
    status.textContent = 'Please fill in all required fields.';
    status.className = 'form-status error';
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    status.textContent = 'Please enter a valid email address.';
    status.className = 'form-status error';
    return;
  }

  var subject = document.getElementById('form-subject').value || 'Portfolio Contact';
  var body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + message;
  window.location.href = 'mailto:penuba4@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

  status.textContent = 'Opening your email client...';
  status.className = 'form-status success';
  setTimeout(function() { status.textContent = ''; }, 4000);
});
