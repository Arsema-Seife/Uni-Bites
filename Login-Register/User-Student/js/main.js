document.addEventListener("DOMContentLoaded", function () {

  // Order Now button
  const orderBtn = document.querySelector(".hero-button");
  if (orderBtn) {
    orderBtn.onclick = () => {
      alert("Please login to place an order");
    };
  }

  // Cafe cards click
  document.querySelectorAll(".Cafe-card").forEach(card => {
    card.onclick = () => {
      alert("Cafe menu page coming soon");
    };
  });

});

