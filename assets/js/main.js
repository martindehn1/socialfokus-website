(() => {
  "use strict";

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Nav scroll state ---------- */
  const nav = document.getElementById("siteNav");
  const progressBar = document.getElementById("progressBar");

  const onScroll = () => {
    const scrollTop = window.scrollY;
    nav.classList.toggle("scrolled", scrollTop > 20);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.querySelector(".nav-links");
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------- Cursor glow (desktop only) ---------- */
  const glow = document.querySelector(".cursor-glow");
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    window.addEventListener("pointermove", (e) => {
      glow.style.opacity = "1";
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });
    window.addEventListener("pointerleave", () => (glow.style.opacity = "0"));
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = (Array.from(el.parentElement.children).indexOf(el) % 6) * 70;
          setTimeout(() => el.classList.add("in-view"), delay);
          revealObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- Hero headline word-reveal trigger ---------- */
  const hero = document.getElementById("hero");
  requestAnimationFrame(() => hero.classList.add("in-view"));

  /* ---------- Count-up numbers ---------- */
  const formatNumber = (n) => new Intl.NumberFormat("de-DE").format(Math.round(n));

  const countEls = document.querySelectorAll(".count-up");
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const duration = 1800;
        const start = performance.now();

        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = formatNumber(target * eased) + (progress >= 1 ? suffix : "");
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        countObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  countEls.forEach((el) => countObserver.observe(el));

  /* ---------- Timeline fill on scroll ---------- */
  const timeline = document.querySelector(".timeline");
  const timelineFill = document.getElementById("timelineFill");
  if (timeline && timelineFill) {
    const updateTimeline = () => {
      const rect = timeline.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height;
      const visible = Math.min(Math.max(vh * 0.75 - rect.top, 0), total);
      const pct = total > 0 ? (visible / total) * 100 : 0;
      timelineFill.style.height = pct + "%";
    };
    window.addEventListener("scroll", updateTimeline, { passive: true });
    window.addEventListener("resize", updateTimeline);
    updateTimeline();
  }

  /* ---------- YouTube facade (click-to-load) ---------- */
  const ytFacade = document.getElementById("ytFacade");
  if (ytFacade) {
    const loadVideo = () => {
      const id = ytFacade.dataset.videoId;
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
      iframe.title = "Social Fokus Video";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      ytFacade.replaceWith(iframe);
    };
    ytFacade.addEventListener("click", loadVideo);
    ytFacade.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        loadVideo();
      }
    });
  }

  /* ---------- Parallax blobs ---------- */
  const blobA = document.querySelector(".blob-a");
  const blobB = document.querySelector(".blob-b");
  if (blobA && blobB) {
    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY;
        blobA.style.translate = `0 ${y * 0.12}px`;
        blobB.style.translate = `0 ${y * -0.08}px`;
      },
      { passive: true }
    );
  }
})();
