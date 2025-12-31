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

const notificationContainer = document.getElementById("notifications-container");

function renderNotifications() {
  notificationContainer.innerHTML = "";

  notifications.forEach((notif) => {
    const card = document.createElement("div");
    card.className = "notification-card";

    card.innerHTML = `
      <h3>${notif.title}</h3>
      <p>${notif.message}</p>
    `;

    notificationContainer.appendChild(card);
  });
}
