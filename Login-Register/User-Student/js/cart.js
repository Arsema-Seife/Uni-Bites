class ShoppingCart {
  constructor() {
    this.cart = [];
    this.init();
  }

  init() {
    this.loadCart();
    this.setupEventListeners();
    this.displayCart();
  }

  setupEventListeners() {
    // Checkout button
    const checkoutBtn = document.getElementById("checkoutBtn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => this.checkout());
    }

    // Browse menu button
    const browseBtn = document.querySelector(".browse-btn");
    if (browseBtn) {
      browseBtn.addEventListener("mouseover", () => {
        browseBtn.style.transform = "scale(1.05)";
      });

      browseBtn.addEventListener("mouseout", () => {
        browseBtn.style.transform = "scale(1)";
      });
      browseBtn.addEventListener("click", () => {
        window.location.href = "menu.html";
      });
    }
  }

  loadCart() {
    const savedCart = localStorage.getItem("uniBitesCart");
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  saveCart() {
    localStorage.setItem("uniBitesCart", JSON.stringify(this.cart));
  }

  displayCart() {
    const cartItemsContainer = document.getElementById("cartItems");
    const emptyCartContainer = document.getElementById("emptyCart");
    const cartSummaryContainer = document.getElementById("cartSummary");

    if (this.cart.length === 0) {
      cartItemsContainer.style.display = "none";
      cartSummaryContainer.style.display = "none";
      emptyCartContainer.style.display = "block";
      return;
    }

    emptyCartContainer.style.display = "none";
    cartItemsContainer.style.display = "block";
    cartSummaryContainer.style.display = "block";

    // Display cart items
    const cartHTML = this.cart
      .map(
        (item) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${
          item.name
        }" class="cart-item-image" 
                     onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'">
                
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-description">${item.description}</div>
                    <div class="cart-item-cafe">${this.getCafeName(
                      item.cafe
                    )}</div>
                </div>
                
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="shoppingCart.updateQuantity('${
                          item.id
                        }', ${item.quantity - 1})">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="shoppingCart.updateQuantity('${
                          item.id
                        }', ${item.quantity + 1})">+</button>
                    </div>
                    
                    <div class="cart-item-price">${(
                      item.price * item.quantity
                    ).toFixed(2)} Birr</div>
                    
                    <button class="remove-btn" onclick="shoppingCart.removeItem('${
                      item.id
                    }')">Remove</button>
                </div>
            </div>
        `
      )
      .join("");

    cartItemsContainer.innerHTML = cartHTML;

    // Update summary
    this.updateSummary();
  }

  getCafeName(cafeId) {
    const cafeNames = {
      "kk-green": "KK Green",
      central: "Central",
      "kk-yellow": "KK Yellow",
      kibnesh: "Kibnesh",
    };
    return cafeNames[cafeId] || cafeId;
  }

  updateQuantity(itemId, newQuantity) {
    if (newQuantity <= 0) {
      this.removeItem(itemId);
      return;
    }

    const item = this.cart.find((item) => item.id === itemId);
    if (item) {
      item.quantity = newQuantity;
      this.saveCart();
      this.displayCart();
    }
  }

  removeItem(itemId) {
    this.cart = this.cart.filter((item) => item.id !== itemId);
    this.saveCart();
    this.displayCart();
    this.showNotification("Item removed from cart");
  }

  updateSummary() {
    const subtotal = this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    document.getElementById("subtotal").textContent = `${subtotal.toFixed(
      2
    )} Birr`;
  }

  checkout() {
    const orderNotes = document.getElementById("orderNotes").value;

    if (this.cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    // Create order
    const order = {
      id: `ORD-${Date.now()}`,
      items: [...this.cart],
      subtotal: this.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),

      notes: orderNotes,
      status: "pending",
      timestamp: new Date().toISOString(),
      customerName: "Student User", // In a real app, this would come from user authentication
    };

    // Save order to localStorage (in a real app, this would be sent to a server)
    let orders = JSON.parse(localStorage.getItem("uniBitesOrders") || "[]");
    orders.push(order);
    localStorage.setItem("uniBitesOrders", JSON.stringify(orders));

    // Also save to cafe dashboard orders
    let cafeOrders = JSON.parse(
      localStorage.getItem("cafeDashboardOrders") || "[]"
    );
    cafeOrders.push(order);
    localStorage.setItem("cafeDashboardOrders", JSON.stringify(cafeOrders));

    // Clear cart
    this.cart = [];
    this.saveCart();

    // Show success message
    this.showOrderConfirmation(order);

    // Redirect to orders page after a delay
    setTimeout(() => {
      window.location.href = "orders.html";
    }, 3000);
  }

  showOrderConfirmation(order) {
    const confirmation = document.createElement("div");
    confirmation.className = "order-confirmation";
    confirmation.innerHTML = `
            <div class="confirmation-content">
                <div class="success-icon">✅</div>
                <h2>Order Placed Successfully!</h2>
                <p><strong>Order ID:</strong> ${order.id}</p>
                <p><strong>Subtotal:</strong> ${order.subtotal.toFixed(
                  2
                )} Birr</p>
                
                <p>You will be redirected to your orders page...</p>
            </div>
        `;

    confirmation.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;

    confirmation.querySelector(".confirmation-content").style.cssText = `
            background: white;
            padding: 40px;
            border-radius: 15px;
            text-align: center;
            max-width: 400px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        `;

    confirmation.querySelector(".success-icon").style.cssText = `
            font-size: 60px;
            margin-bottom: 20px;
        `;

    document.body.appendChild(confirmation);

    // Remove confirmation after 3 seconds
    setTimeout(() => {
      confirmation.remove();
    }, 3000);
  }

  showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

// Initialize shopping cart when page loads
let shoppingCart;
document.addEventListener("DOMContentLoaded", () => {
  shoppingCart = new ShoppingCart();
});
