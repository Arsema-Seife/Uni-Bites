document.addEventListener("DOMContentLoaded", () => {
  const browseBtn = document.querySelector(".browse-btn");

  browseBtn.addEventListener("mouseover", () => {
    browseBtn.style.transform = "scale(1.05)";
  });

document.querySelector(".browse-btn").addEventListener("click", () => {
    window.location.href = "menu.html";
});
});