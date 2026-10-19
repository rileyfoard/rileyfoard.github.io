// Photo lightbox: click any photo marked data-zoom to see it full screen.
document.addEventListener("DOMContentLoaded", () => {
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
