document.addEventListener("DOMContentLoaded", () => {
  const browseBtn = document.querySelector(".browse-btn");

  browseBtn.addEventListener("mouseover", () => {
    browseBtn.style.transform = "scale(1.05)";
  });

  browseBtn.addEventListener("mouseout", () => {
    browseBtn.style.transform = "scale(1)";
  });

  browseBtn.addEventListener("click", () => {
    window.location.href = "menu.html";
  });
});
