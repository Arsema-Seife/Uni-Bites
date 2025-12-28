// Simple Cafe Order Management System
let cafeOrders = [];

// Load orders from user orders
function loadCafeOrders() {
    let userOrders = localStorage.getItem('uniBitesOrders');
    if (userOrders) {
        cafeOrders = JSON.parse(userOrders);
        // Sort by newest first
        cafeOrders.sort(function(a, b) {
            return new Date(b.timestamp) - new Date(a.timestamp);
        });
    }
}

// Save updated orders back to storage
function saveCafeOrders() {
    localStorage.setItem('uniBitesOrders', JSON.stringify(cafeOrders));
}

// Show all orders for cafe
function showCafeOrders() {
    let container = document.getElementById('cafeOrdersContainer');
    let emptyDiv = document.getElementById('emptyCafeOrders');
    
    // If no orders, show empty message
    if (cafeOrders.length === 0) {
        container.style.display = 'none';
        emptyDiv.style.display = 'block';
        updateOrderStats();
        return;
    }
    
    // Hide empty message and show orders
    emptyDiv.style.display = 'none';
    container.style.display = 'block';
    
    // Create HTML for each order
    let html = '';
    for (let i = 0; i < cafeOrders.length; i++) {
        let order = cafeOrders[i];
        html += createCafeOrderHTML(order);
    }
    
    container.innerHTML = html;
    updateOrderStats();
}

// Create HTML for one cafe order
function createCafeOrderHTML(order) {
    let html = `
        <div class="cafe-order-card ${order.status}">
            <div class="cafe-order-header">
                <h3>Order #${order.id}</h3>
                <span class="cafe-order-status status-${order.status}">${order.status}</span>
                <div class="cafe-order-total">${order.total} Birr</div>
            </div>

            <div class="cafe-order-details">
                <div class="customer-info">
                    <strong>Customer:</strong> ${order.customerName || 'Student'}
                    <br><strong>Location:</strong> ${getLocationName(order.deliveryLocation)}
                    ${order.notes ? '<br><strong>Notes:</strong> ' + order.notes : ''}
                </div>

                <div class="cafe-order-items">
    `;
    
    // Add each item in the order
    for (let j = 0; j < order.items.length; j++) {
        let item = order.items[j];
        html += `
            <div class="cafe-order-item">
                <img src="${item.image}" alt="${item.name}" class="cafe-order-item-image">
                <div class="cafe-order-item-details">
                    <div class="cafe-order-item-name">${item.name}</div>
                    <div class="cafe-order-item-quantity">Qty: ${item.quantity}</div>
                </div>
                <div class="cafe-order-item-price">${item.price * item.quantity} Birr</div>
            </div>
        `;
    }
    
    html += `
                </div>
            </div>
            
            <div class="cafe-order-actions">
    `;
    
    // Add buttons based on order status
    if (order.status === 'pending') {
        html += `
            <button class="accept-btn" onclick="acceptOrder('${order.id}')">Accept Order</button>
            <button class="reject-btn" onclick="rejectOrder('${order.id}')">Reject Order</button>
        `;
    } else if (order.status === 'confirmed') {
        html += `<button class="prepare-btn" onclick="startPreparing('${order.id}')">Start Preparing</button>`;
    } else if (order.status === 'preparing') {
        html += `<button class="ready-btn" onclick="markReady('${order.id}')">Mark Ready</button>`;
    }
    
    html += `
            </div>
        </div>
    `;
    
    return html;
}

// Accept an order
function acceptOrder(orderId) {
    for (let i = 0; i < cafeOrders.length; i++) {
        if (cafeOrders[i].id === orderId) {
            cafeOrders[i].status = 'confirmed';
            saveCafeOrders();
            showCafeOrders();
            showCafeMessage('Order accepted!');
            break;
        }
    }
}

// Reject an order
function rejectOrder(orderId) {
    if (confirm('Reject this order?')) {
        for (let i = 0; i < cafeOrders.length; i++) {
            if (cafeOrders[i].id === orderId) {
                cafeOrders[i].status = 'cancelled';
                saveCafeOrders();
                showCafeOrders();
                showCafeMessage('Order rejected');
                break;
            }
        }
    }
}

// Start preparing order
function startPreparing(orderId) {
    for (let i = 0; i < cafeOrders.length; i++) {
        if (cafeOrders[i].id === orderId) {
            cafeOrders[i].status = 'preparing';
            saveCafeOrders();
            showCafeOrders();
            showCafeMessage('Started preparing order');
            break;
        }
    }
}

// Mark order as ready
function markReady(orderId) {
    for (let i = 0; i < cafeOrders.length; i++) {
        if (cafeOrders[i].id === orderId) {
            cafeOrders[i].status = 'ready';
            saveCafeOrders();
            showCafeOrders();
            showCafeMessage('Order is ready for pickup!');
            break;
        }
    }
}

// Get location name
function getLocationName(locationId) {
    let locations = {
        'dorm-1': 'Dormitory Block 1',
        'dorm-2': 'Dormitory Block 2',
        'library': 'Library',
        'cafeteria': 'Main Cafeteria',
        'classroom-a': 'Classroom Block A',
        'classroom-b': 'Classroom Block B'
    };
    return locations[locationId] || locationId;
}

// Update order statistics
function updateOrderStats() {
    let pendingCount = 0;
    for (let i = 0; i < cafeOrders.length; i++) {
        if (cafeOrders[i].status === 'pending') {
            pendingCount++;
        }
    }
    document.getElementById('pendingCount').textContent = pendingCount;
}

// Show cafe message
function showCafeMessage(text) {
    let message = document.createElement('div');
    message.textContent = text;
    message.className = 'cafe-notification';
    
    document.body.appendChild(message);
    
    // Remove message after 3 seconds
    setTimeout(function() {
        document.body.removeChild(message);
    }, 3000);
}

// Auto refresh orders every 10 seconds
function autoRefresh() {
    loadCafeOrders();
    showCafeOrders();
}

// Start everything when page loads
window.onload = function() {
    loadCafeOrders();
    showCafeOrders();
    
    // Auto refresh every 10 seconds
    setInterval(autoRefresh, 10000);
};