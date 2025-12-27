document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".notification-card");

  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";

    setTimeout(() => {
      card.style.transition = "all 0.5s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 150);
  });
});

const notificationData = [
  {
    title: "Order Received",
    message: "Your order has been placed successfully."
  },
  {
    title: "Preparing Order",
    message: "The kitchen is preparing your food."
  },
  {
    title: "Order Ready",
    message: "Your order is ready for pickup."
  }
];
