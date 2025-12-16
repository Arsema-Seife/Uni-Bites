
const btn = document.querySelector(".browse-btn");

btn.addEventListener("mouseenter", () => {
    btn.style.transform = "translateY(-5px)";
});

btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translateY(0)";
    btn.style.boxShadow = "0 4px 12px rgba(255, 107, 53, 0.2)";
});

btn.addEventListener("click", () => {
    window.location.href = "menu.html";
});