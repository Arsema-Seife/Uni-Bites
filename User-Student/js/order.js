// Simple Order System - Easy to understand
let orders = [];

// Load orders when page starts
function loadOrders() {
    let savedOrders = localStorage.getItem('uniBitesOrders');
    if (savedOrders) {
        orders = JSON.parse(savedOrders);
        // Sort orders: newest first, then by status priority
        orders.sort(function(a, b) {
            // First sort by timestamp (newest first)
            let timeA = new Date(a.timestamp);
            let timeB = new Date(b.timestamp);
            return timeB - timeA;
        });
    }
}

// Save orders to storage
function saveOrders() {
    localStorage.setItem('uniBitesOrders', JSON.stringify(orders));
}

// Show all orders on the page
function showOrders() {
    let container = document.getElementById('ordersContainer');
    let emptyDiv = document.getElementById('emptyOrders');
    
    // If no orders, show empty message
    if (orders.length === 0) {
        container.style.display = 'none';
        emptyDiv.style.display = 'block';
        return;
    }
    
    // Hide empty message and show orders
    emptyDiv.style.display = 'none';
    container.style.display = 'block';
    
    // Separate orders by status
    let activeOrders = [];
    let completedOrders = [];
    
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].status === 'delivered' || orders[i].status === 'cancelled') {
            completedOrders.push(orders[i]);
        } else {
            activeOrders.push(orders[i]);
        }
    }
    
    // Create HTML
    let html = '';
    
    // Show active orders first
    if (activeOrders.length > 0) {
        html += '<h2 class="order-section-title">Active Orders</h2>';
        for (let i = 0; i < activeOrders.length; i++) {
            html += createOrderHTML(activeOrders[i]);
        }
    }
    
    // Show completed orders
    if (completedOrders.length > 0) {
        html += '<h2 class="order-section-title">Order History</h2>';
        for (let i = 0; i < completedOrders.length; i++) {
            html += createOrderHTML(completedOrders[i]);
        }
    }
    
    container.innerHTML = html;
}

// Create HTML for one order
function createOrderHTML(order) {
    let html = `
        <div class="order-card ${order.status}">
            <div class="order-header">
                <h3>Order #${order.id}</h3>
                <span class="order-status status-${order.status}">${order.status}</span>
                <div class="order-total">${order.total} Birr</div>
            </div>

            <div class="order-items">
    `;
    
    // Add each item in the order
    for (let j = 0; j < order.items.length; j++) {
        let item = order.items[j];
        html += `
            <div class="order-item">
                <img src="${item.image}" alt="${item.name}" class="order-item-image">
                <div class="order-item-details">
                    <div class="order-item-name">${item.name}</div>
                    <div class="order-item-quantity">Qty: ${item.quantity} - ${item.price * item.quantity} Birr</div>
                </div>
            </div>
        `;
    }
    
    html += `
            </div>
            <div class="order-actions">
    `;
    
    // Add buttons based on order status
    if (order.status === 'pending') {
        html += `<button onclick="cancelOrder('${order.id}')">Cancel Order</button>`;
    }
    if (order.status === 'ready') {
        html += `<button onclick="markDelivered('${order.id}')">Mark Received</button>`;
    }
    if (order.status === 'delivered' || order.status === 'cancelled') {
        html += `<button onclick="reorderItems('${order.id}')">Order Again</button>`;
    }
    
    html += `
            </div>
        </div>
    `;
    
    return html;
}

// Cancel an order
function cancelOrder(orderId) {
    // Find the order
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].id === orderId) {
            // Ask user to confirm
            if (confirm('Cancel this order?')) {
                orders[i].status = 'cancelled';
                saveOrders();
                showOrders();
                showMessage('Order cancelled');
            }
            break;
        }
    }
}

// Mark order as delivered
function markDelivered(orderId) {
    // Find the order
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].id === orderId) {
            orders[i].status = 'delivered';
            saveOrders();
            showOrders();
            showMessage('Order received!');
            break;
        }
    }
}

// Order the same items again
function reorderItems(orderId) {
    // Find the order
    let orderToReorder = null;
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].id === orderId) {
            orderToReorder = orders[i];
            break;
        }
    }
    
    if (orderToReorder) {
        // Get current cart
        let cart = localStorage.getItem('uniBitesCart');
        if (cart) {
            cart = JSON.parse(cart);
        } else {
            cart = [];
        }
        
        // Add items to cart
        for (let i = 0; i < orderToReorder.items.length; i++) {
            let item = orderToReorder.items[i];
            
            // Check if item already in cart
            let found = false;
            for (let j = 0; j < cart.length; j++) {
                if (cart[j].id === item.id) {
                    cart[j].quantity += item.quantity;
                    found = true;
                    break;
                }
            }
            
            // If not found, add new item
            if (!found) {
                cart.push(item);
            }
        }
        
        // Save cart and go to cart page
        localStorage.setItem('uniBitesCart', JSON.stringify(cart));
        showMessage('Items added to cart!');
        setTimeout(function() {
            window.location.href = 'cart.html';
        }, 1500);
    }
}

// Show a simple message
function showMessage(text) {
    let message = document.createElement('div');
    message.textContent = text;
    message.className = 'notification';
    
    document.body.appendChild(message);
    
    // Remove message after 3 seconds
    setTimeout(function() {
        document.body.removeChild(message);
    }, 3000);
}

// Start everything when page loads
window.onload = function() {
    loadOrders();
    showOrders();
};