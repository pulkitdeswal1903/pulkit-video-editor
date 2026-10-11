/* =========================================================
   PULKIT DESWAL — PORTFOLIO SCRIPT
   Vanilla JS, no dependencies.
   ========================================================= */
(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- DATA ---------- */

  const SKILLS = [
    { name: "Adobe Premiere Pro", tag: "Edit" },
    { name: "Adobe After Effects", tag: "Motion" },
    { name: "Canva", tag: "Design" },
    { name: "Motion Graphics", tag: "Motion" },
    { name: "Video Editing", tag: "Edit" },
    { name: "Color Grading", tag: "Look" },
    { name: "Sound Design", tag: "Audio" },
    { name: "Storyboarding", tag: "Plan" },
    { name: "Product Advertisement", tag: "Strategy" },
    { name: "Brand Storytelling", tag: "Strategy" },
    { name: "Social Media Editing", tag: "Social" },
    { name: "UGC Ads", tag: "Social" },
    { name: "AI Video Generation", tag: "AI" },
    { name: "Prompt Engineering", tag: "AI" },
  ];

  const AI_TOOLS = [
    "ChatGPT", "Claude", "Google Veo", "Kling AI", "Higgsfield", "Adobe Firefly", "Grok",
  ];

  const EXPERIENCE = [
    {
      company: "Blinkit",
      role: "Video Editing Intern",
      items: ["Edited product explainer reels", "Instagram content", "YouTube Shorts", "150K+ organic impressions"],
    },
    {
      company: "Eternal Media",
      role: "Junior Video Editor",
      items: ["Brand reels", "Corporate videos", "Digital advertisements", "20+ client projects"],
    },
    {
      company: "Earthen Story",
      role: "Video & Design Associate",
      items: ["Product commercials", "E-commerce videos", "Sales-oriented advertisements", "Brand consistency"],
    },
    {
      company: "Klickr",
      role: "Video Editor",
      items: ["UGC Advertisements", "Awareness videos", "Creative storytelling"],
    },
  ];

  const PROJECTS = [
    {
      id: "VLiqIdSmL5Y",
      title: "Editors Showreel",
      desc: "A fast-paced showcase of my editing style, creative direction, motion graphics, product commercials, and AI-powered content created for modern brands and digital platforms.",
      software: ["Premiere Pro", "After Effects","Creative Direction"],
    },
    {
      id: "y-HoPP6gTis",
      title: "Sunflower Oil Commercial",
      desc: "A cinematic product advertisement combining storytelling, smooth B-roll editing, typography, and subtle motion graphics to present the product in a visually engaging and informative way.",
      software: ["Premiere Pro", "Color Grading","Motion Graphics"],
    },
    {
      id: "--fZWg2VUz8",
      title: "AI Animated Brand Story",
      desc: "A story-driven animated video featuring an AI-generated mascot, combining cinematic storytelling, character animation, and creative editing to build an engaging brand narrative.",
      software: ["AI Video Generation", "Storytelling", "Premiere Pro"],
    },
    {
      id: "iFKzWqItZMU",
      title: "AI Product Commercial",
      desc: "A product commercial created using AI-generated realistic visuals, blended with professional editing to showcase real-life product usage through cinematic storytelling.",
      software: ["Product Advertising", "AI Generation"],
    },
    {
      id: "L6L_upjoZ2Q",
      title: "Animated Mascot Short",
      desc: "A short-form animated brand story featuring an AI-generated mascot, edited with dynamic pacing and storytelling to create an entertaining and memorable viewing experience.",
      software: ["Character Animation", "AI Video Generation", "Motion Graphics"],
    },
    {
      id: "FXlmlXmB6gA",
      title: "Groundnut Oil Commercial",
      desc: "A commercial product advertisement blending AI-generated visuals, cinematic B-roll, and real-life footage with clean editing and storytelling to highlight the product naturally.",
      software: ["Premiere Pro", "Storytelling", "AI Video Generation"],
    },
    {
      id: "J7BvaRROkmg",
      title: "Mamra Product Advertisement",
      desc: "A clean product advertisement combining real-life footage, motion graphics, cinematic B-roll, typography, and sound design to create an engaging promotional video.",
      software: ["Premiere Pro", "Typography"],
    },
  ];

  const SHORTS = [
    { id: "rR6lz7A2RK8", label: "Authentic Lifestyle Product Promotion" },
    { id: "hxK8lCHUAL4", label: "Women's Wellness Awareness Campaign" },
    { id: "1h-RJvvzmqQ", label: "Creative Company Brand Story" },
    { id: "bufnXN54tiU", label: "Lifestyle Astrology Bracelet Advertisement" },
  ];

  const PROCESS = ["Idea", "Research", "Storyboarding", "AI Generation", "Editing", "Motion Graphics", "Sound Design", "Final Delivery"];

  const STATS = [
    { value: 20, suffix: "+", label: "Client Projects" },
    { value: 150, suffix: "K+", label: "Organic Views" },
    { value: 3, suffix: "X", label: "Sales Growth" },
    { value: 0, suffix: "AI First Workflow", label: "Built for speed & scale", isText: true },
    { value: 0, suffix: "Fast Delivery", label: "Reliable turnaround", isText: true },
  ];

  const ROLES = ["AI Video Editor", "Motion Designer", "Creative Storyteller"];

  /* ---------- UTIL ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const initials = (str) => str.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();

  /* ---------- PRELOADER ---------- */
  function initPreloader() {
    const preloader = $("#preloader");
    const fill = $("#preloaderFill");
    const code = $("#preloaderCode");
    let pct = 0;
    const totalFrames = 96;
    const timer = setInterval(() => {
      pct += Math.random() * 18 + 6;
      if (pct >= 100) {
        pct = 100;
        clearInterval(timer);
        setTimeout(() => preloader.classList.add("hidden"), 250);
      }
      fill.style.width = pct + "%";
      const frame = Math.round((pct / 100) * totalFrames);
      code.textContent = `00:00:0${Math.floor(frame / 24)}:${String(frame % 24).padStart(2, "0")}`;
    }, 140);
  }

  /* ---------- CURSOR GLOW ---------- */
  function initCursorGlow() {
    if (!window.matchMedia("(hover:hover)").matches) return;
    const glow = $("#cursorGlow");
    window.addEventListener("mousemove", (e) => {
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
    }, { passive: true });
  }

  /* ---------- SCRUB BAR (scroll timeline) ---------- */
  function initScrubBar() {
    const fill = $("#scrubFill");
    const playhead = $("#scrubPlayhead");
    const timecode = $("#scrubTimecode");
    const markersWrap = $("#scrubMarkers");
    const navbar = $("#navbar");
    const sections = $$("main > section");
    const totalDocFrames = 24 * 60 * 3; // fictional 3-minute reel at 24fps

    function layoutMarkers() {
      markersWrap.innerHTML = "";
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      sections.forEach(sec => {
        const pct = (sec.offsetTop / docHeight) * 100;
        const m = document.createElement("div");
        m.className = "scrub-marker";
        m.style.left = Math.min(Math.max(pct, 0), 100) + "%";
        markersWrap.appendChild(m);
      });
    }

    function update() {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      const pct = height > 0 ? (scrollTop / height) * 100 : 0;
      fill.style.width = pct + "%";
      playhead.style.left = pct + "%";

      const frame = Math.floor((pct / 100) * totalDocFrames);
      const ff = frame % 24;
      const ss = Math.floor(frame / 24) % 60;
      const mm = Math.floor(frame / (24 * 60)) % 60;
      const hh = Math.floor(frame / (24 * 60 * 60));
      timecode.textContent = [hh, mm, ss, ff].map(n => String(n).padStart(2, "0")).join(":");

      navbar.classList.toggle("scrolled", scrollTop > 40);
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", () => { layoutMarkers(); update(); });
    layoutMarkers();
    update();
  }

  /* ---------- MOBILE NAV ---------- */
  function initNav() {
    const toggle = $("#navToggle");
    const links = $("#navLinks");
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("mobile-open");
      toggle.setAttribute("aria-expanded", open);
      links.style.cssText = open
        ? "display:flex; flex-direction:column; position:fixed; top:80px; left:16px; right:16px; background:rgba(17,17,24,0.96); border:1px solid var(--line); border-radius:20px; padding:20px; gap:16px; z-index:150;"
        : "";
    });
    $$("#navLinks a").forEach(a => a.addEventListener("click", () => {
      links.classList.remove("mobile-open");
      links.style.cssText = "";
    }));
  }

  /* ---------- HERO TYPING ANIMATION ---------- */
  function initTyping() {
    const el = $("#typedRole");
    if (prefersReducedMotion) { el.textContent = ROLES[0]; return; }
    let roleIndex = 0, charIndex = 0, deleting = false;

    function tick() {
      const current = ROLES[roleIndex];
      if (!deleting) {
        charIndex++;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        charIndex--;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % ROLES.length;
        }
      }
      setTimeout(tick, deleting ? 35 : 70);
    }
    tick();
  }

  /* ---------- PARTICLES CANVAS ---------- */
  function initParticles() {
    const canvas = $("#particles");
    const ctx = canvas.getContext("2d");
    let particles = [];
    let w, h;

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }

    function make(n) {
      particles = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        o: Math.random() * 0.5 + 0.15,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,190,255,${p.o})`;
        ctx.fill();
      });
      if (!prefersReducedMotion) requestAnimationFrame(draw);
    }

    resize();
    make(Math.min(70, Math.floor((w * h) / 18000)));
    draw();
    window.addEventListener("resize", () => { resize(); make(Math.min(70, Math.floor((w * h) / 18000))); });
  }

  /* ---------- SCROLL REVEAL ---------- */
  function initReveal() {
    const targets = $$(".reveal-up, .skill-card, .ai-tool-card, .timeline-item, .project-card, .stat-card, .process-step");
    if (prefersReducedMotion) { targets.forEach(t => t.classList.add("in-view")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
    targets.forEach(t => io.observe(t));
  }

  /* ---------- RENDER: SKILLS ---------- */
  function renderSkills() {
    const grid = $("#skillsGrid");
    grid.innerHTML = SKILLS.map((s, i) => `
      <div class="skill-card" style="transition-delay:${(i % 4) * 60}ms">
        <div class="skill-card-icon">${initials(s.name)}</div>
        <h3>${s.name}</h3>
        <p>${s.tag}</p>
      </div>
    `).join("");
  }

  /* ---------- RENDER: AI TOOLS ---------- */
  function renderAiTools() {
    const grid = $("#aiToolsGrid");
    grid.innerHTML = AI_TOOLS.map((t, i) => `
      <div class="ai-tool-card" style="transition-delay:${(i % 5) * 60}ms">
        <div class="ai-tool-icon">${initials(t)}</div>
        <span>${t}</span>
      </div>
    `).join("");
  }

  /* ---------- RENDER: EXPERIENCE ---------- */
  function renderExperience() {
    const wrap = $("#experienceTimeline");
    wrap.innerHTML = EXPERIENCE.map(e => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-role">${e.role}</div>
        <div class="timeline-company">${e.company}</div>
        <div class="timeline-list">${e.items.map(i => `<span>${i}</span>`).join("")}</div>
      </div>
    `).join("");
  }

  /* ---------- RENDER: PROJECTS (lazy-loaded YouTube facade) ---------- */
  function renderProjects() {
    const grid = $("#projectsGrid");
    grid.innerHTML = PROJECTS.map(p => `
      <article class="project-card">
        <div class="project-media" data-yt="${p.id}" role="button" tabindex="0" aria-label="Play ${p.title}">
          <img loading="lazy" src="https://img.youtube.com/vi/${p.id}/hqdefault.jpg" alt="${p.title} thumbnail" />
          <div class="project-play">
            <svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="31" fill="rgba(8,8,12,0.55)" stroke="white" stroke-opacity="0.5"/><path d="M26 20l20 12-20 12V20Z" fill="white"/></svg>
          </div>
        </div>
        <div class="project-body">
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <div class="project-software">${p.software.map(s => `<span>${s}</span>`).join("")}</div>
        </div>
      </article>
    `).join("");

    $$(".project-media", grid).forEach(el => {
      const play = () => loadYoutubeFacade(el, el.dataset.yt);
      el.addEventListener("click", play);
      el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); play(); } });
    });
  }

  function loadYoutubeFacade(container, id) {
    container.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
    container.querySelector("iframe").style.cssText = "width:100%;height:100%;border:0;";
  }

  /* ---------- RENDER: SHORTS COVERFLOW ---------- */
  function initCoverflow() {
    const track = $("#cfTrack");
    let index = 0;

    track.innerHTML = SHORTS.map(s => `
      <div class="cf-card" data-yt="${s.id}">
        <img class="cf-thumb" loading="lazy" src="https://img.youtube.com/vi/${s.id}/hqdefault.jpg" alt="${s.label}" />
        <div class="project-play" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;">
          <svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="31" fill="rgba(8,8,12,0.55)" stroke="white" stroke-opacity="0.5"/><path d="M26 20l20 12-20 12V20Z" fill="white"/></svg>
        </div>
        <div class="cf-label">${s.label}</div>
      </div>
    `).join("");

    const cards = $$(".cf-card", track);

    function layout() {
      const n = cards.length;
      cards.forEach((card, i) => {
        let offset = i - index;
        if (offset > n / 2) offset -= n;
        if (offset < -n / 2) offset -= -n;
        const abs = Math.abs(offset);
        const x = offset * 190;
        const z = -abs * 140;
        const rot = offset * -28;
        const scale = abs === 0 ? 1 : 0.8;
        const opacity = abs > 2 ? 0 : 1 - abs * 0.18;
        card.style.transform = `translate(-50%,-50%) translateX(${x}px) translateZ(${z}px) rotateY(${rot}deg) scale(${scale})`;
        card.style.left = "50%"; card.style.top = "50%";
        card.style.opacity = opacity;
        card.style.zIndex = 10 - abs;
        card.style.filter = abs === 0 ? "none" : "brightness(0.55)";
      });
    }

    cards.forEach((card, i) => {
      card.addEventListener("click", () => {
        if (i !== index) { index = i; layout(); }
        else loadYoutubeFacade(card, card.dataset.yt);
      });
    });

    $("#cfPrev").addEventListener("click", () => { index = (index - 1 + cards.length) % cards.length; layout(); });
    $("#cfNext").addEventListener("click", () => { index = (index + 1) % cards.length; layout(); });

    layout();
    window.addEventListener("resize", layout);

    // gentle autoplay of the carousel rotation
    if (!prefersReducedMotion) {
      setInterval(() => { index = (index + 1) % cards.length; layout(); }, 5000);
    }
  }

  /* ---------- RENDER: PROCESS ---------- */
  function renderProcess() {
    const wrap = $("#processLine");
    wrap.innerHTML = PROCESS.map((step, i) => `
      <div class="process-step" style="transition-delay:${i * 60}ms">
        <span class="process-index">${String(i + 1).padStart(2, "0")}</span>
        <span class="process-name">${step}</span>
      </div>
    `).join("");
  }

  /* ---------- RENDER: STATS + COUNT-UP ---------- */
  function renderStats() {
    const grid = $("#statGrid");
    grid.innerHTML = STATS.map(s => `
      <div class="stat-card">
        <div class="stat-value" ${!s.isText ? `data-count="${s.value}" data-suffix="${s.suffix}"` : ""}>${s.isText ? s.suffix : "0" + s.suffix}</div>
        <div class="stat-label">${s.label}</div>
      </div>
    `).join("");

    const counters = $$("[data-count]", grid);
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        const target = parseInt(entry.target.dataset.count, 10);
        const suffix = entry.target.dataset.suffix;
        if (prefersReducedMotion) { entry.target.textContent = target + suffix; return; }
        let cur = 0;
        const step = Math.max(1, Math.round(target / 40));
        const timer = setInterval(() => {
          cur += step;
          if (cur >= target) { cur = target; clearInterval(timer); }
          entry.target.textContent = cur + suffix;
        }, 30);
      });
    }, { threshold: 0.4 });
    counters.forEach(c => io.observe(c));
  }

  /* ---------- CONTACT FORM ---------- */

function initContactForm() {
  const form = $("#contactForm");
  const note = $("#formNote");
  const label = $("#contactSubmitLabel");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    label.textContent = "Sending...";
    note.textContent = "";

    try {
      const response = await fetch("https://formspree.io/f/mppqrkvb", {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        label.textContent = "Send Message";
        note.textContent = "Thanks — I'll get back to you within 24 hours.";
        form.reset();
      } else {
        label.textContent = "Send Message";
        note.textContent = "Sorry, your message could not be sent. Please try again.";
      }
    } catch (error) {
      label.textContent = "Send Message";
      note.textContent = "Network error. Please check your connection and try again.";
    }
  });
}
  /* ---------- SHOWREEL MODAL ---------- */
  function initShowreel() {
    const modal = $("#showreelModal");
    const videoWrap = $("#modalVideo");
    const openBtn = $("#showreelBtn");
    const closeBtn = $("#modalClose");
    const backdrop = $("#modalBackdrop");
    const showreelId = PROJECTS[0].id;

    function open() {
      videoWrap.innerHTML = `<iframe src="https://www.youtube.com/embed/${showreelId}?autoplay=1&rel=0" title="Showreel" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    }
    function close() {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      videoWrap.innerHTML = "";
    }
    openBtn.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    backdrop.addEventListener("click", close);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }

  /* ---------- SCROLL CUE ---------- */
  function initScrollCue() {
    $("#scrollCue").addEventListener("click", () => {
      $("#about").scrollIntoView({ behavior: "smooth" });
    });
  }

  /* ---------- INIT ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    $("#year").textContent = new Date().getFullYear();
    initPreloader();
    initCursorGlow();
    initScrubBar();
    initNav();
    initTyping();
    initParticles();
    renderSkills();
    renderAiTools();
    renderExperience();
    renderProjects();
    initCoverflow();
    renderProcess();
    renderStats();
    initContactForm();
    initShowreel();
    initScrollCue();
    initReveal();
  });
})();
