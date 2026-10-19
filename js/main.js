// Photo lightbox: click any photo marked data-zoom to see it full screen.
document.addEventListener("DOMContentLoaded", () => {
  // Show the name in the top bar only after scrolling past the big name.
  const navName = document.querySelector(".nav__name.is-hidden");
  const hero = document.querySelector(".hero");
  if (navName && hero && "IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => navName.classList.toggle("is-hidden", e.isIntersecting), { rootMargin: "-100px 0px 0px 0px" }).observe(hero);
  } else if (navName) { navName.classList.remove("is-hidden"); }

  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.innerHTML = '<button type="button" aria-label="Close photo">&times;</button><div><img alt=""><p></p></div>';
  document.body.appendChild(lb);
  const lbImg = lb.querySelector("img"), lbCap = lb.querySelector("p");
  const close = () => lb.classList.remove("is-open");
  lb.addEventListener("click", e => { if (e.target === lb || e.target.tagName === "BUTTON") close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  document.querySelectorAll("img[data-zoom]").forEach(img => {
    img.tabIndex = 0;
    const open = () => {
      lbImg.src = img.src; lbImg.alt = img.alt;
      lbCap.textContent = img.closest("figure")?.querySelector("figcaption")?.textContent || "";
      lb.classList.add("is-open");
      lb.querySelector("button").focus();
    };
    img.addEventListener("click", open);
    img.addEventListener("keydown", e => { if (e.key === "Enter") open(); });
  });
});
