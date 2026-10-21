document.addEventListener("DOMContentLoaded", () => {
  // Show the name in the top bar only after scrolling past the big name.
  const navName = document.querySelector(".nav__name.is-hidden");
  const hero = document.querySelector(".hero");
  if (navName && hero && "IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => navName.classList.toggle("is-hidden", e.isIntersecting), { rootMargin: "-100px 0px 0px 0px" }).observe(hero);
  } else if (navName) { navName.classList.remove("is-hidden"); }

  // Lightbox for photos (img[data-zoom], .thumb[data-photo]) and videos (.thumb[data-video]).
  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.innerHTML = '<button type="button" class="lightbox__close" aria-label="Close">&times;</button><div class="lightbox__body"></div>';
  document.body.appendChild(lb);
  const body = lb.querySelector(".lightbox__body");
  const close = () => { lb.classList.remove("is-open"); body.innerHTML = ""; };
  lb.addEventListener("click", e => { if (e.target === lb || e.target.classList.contains("lightbox__close")) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && lb.classList.contains("is-open")) close(); });

  function openPhoto(src, alt, caption) {
    body.innerHTML = "";
    const img = document.createElement("img"); img.src = src; img.alt = alt || "";
    body.appendChild(img);
    if (caption) { const p = document.createElement("p"); p.textContent = caption; body.appendChild(p); }
    lb.classList.add("is-open"); lb.querySelector(".lightbox__close").focus();
  }
  function openVideo(src) {
    body.innerHTML = "";
    const v = document.createElement("video");
    v.src = src; v.controls = true; v.autoplay = true; v.playsInline = true;
    body.appendChild(v);
    lb.classList.add("is-open"); lb.querySelector(".lightbox__close").focus();
  }

  document.querySelectorAll("img[data-zoom]").forEach(img => {
    img.tabIndex = 0;
    const go = () => openPhoto(img.src, img.alt, img.closest("figure")?.querySelector("figcaption")?.textContent);
    img.addEventListener("click", go);
    img.addEventListener("keydown", e => { if (e.key === "Enter") go(); });
  });
  document.querySelectorAll(".thumb").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.dataset.video) openVideo(btn.dataset.video);
      else openPhoto(btn.dataset.photo, btn.querySelector("img")?.alt);
    });
  });
});
