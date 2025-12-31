let notifications = [
    {
        id: 1,
        type: 'ready',
        title: 'Your order #124 is ready!',
        message: 'Your pasta and Egg sandwich are prepared. Pick them up at Yellow KK.',
        timestamp: new Date(Date.now() - 5 * 60000),
        isRead: false
    },
    {
        id: 2,
        type: 'updated',
        title: 'Your order is being prepared',
        message: 'The café has started preparing your Firifir and avocado juice.',
        timestamp: new Date(Date.now() - 20 * 60000),
        isRead: false
    },
    {
        id: 3,
        type: 'reminder',
        title: 'Don\'t forget your last pickup!',
        message: 'Order #118 is still waiting at Central. Please collect it soon.',
        timestamp: new Date(Date.now() - 60 * 60000),
        isRead: true
    }
];

let currentFilter = 'all';

function getIcon(type) {
    const icons = {
        ready: '🔔',
        updated: '🔄',
        reminder: '✅'
    };
    return icons[type] || '📢';
}

function getLabel(type) {
    const labels = {
        ready: 'Ready for Pickup',
        updated: 'Order Update',
        reminder: 'Reminder'
    };
    return labels[type] || 'Notification';
}

function getTimeAgo(timestamp) {
    const diff = Math.floor((new Date() - new Date(timestamp)) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return new Date(timestamp).toLocaleDateString();
}

function renderNotifications() {
    const container = document.querySelector('.notifications-list');
    
    if (!container) {
        console.error('Container not found!');
        return;
    }

    // Filter notifications
    let filtered = currentFilter === 'all' 
        ? notifications 
        : notifications.filter(n => n.type === currentFilter);
    
    // Sort by timestamp
    filtered = filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    if (filtered.length === 0) {
        container.innerHTML = '<div class="no-notifications"><p>No notifications found</p></div>';
        return;
    }

    container.innerHTML = filtered.map(n => `
        <div class="notification-card ${n.isRead ? 'read' : 'unread'}" data-id="${n.id}">
            <div class="notification-header">
                <div class="notif-type ${n.type}">${getIcon(n.type)} ${getLabel(n.type)}</div>
                <div class="notification-actions">
                    <button class="action-btn mark-btn" onclick="toggleRead(${n.id})">${n.isRead ? '📖' : '📩'}</button>
                    <button class="action-btn delete-btn" onclick="deleteNotification(${n.id})">🗑️</button>
                </div>
            </div>
            <h3>${n.title}</h3>
            <p>${n.message}</p>
            <div class="notification-footer">
                <span class="notif-time">${getTimeAgo(n.timestamp)}</span>
            </div>
        </div>
    `).join('');

    updateBadge();
    animateCards();
}

function updateBadge() {
    const unread = notifications.filter(n => !n.isRead).length;
    const navBadge = document.querySelector('.nav-notification-badge');
    if (navBadge) {
        navBadge.textContent = unread;
        navBadge.style.display = unread > 0 ? 'flex' : 'none';
    }
}

function animateCards() {
    const cards = document.querySelectorAll('.notification-card');
    cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, i * 100);
    });
}

function setFilter(filterType) {
    currentFilter = filterType;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${filterType}"]`).classList.add('active');
    
    renderNotifications();
}

function toggleRead(id) {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
        notification.isRead = !notification.isRead;
        renderNotifications();
    }
}

function deleteNotification(id) {
    notifications = notifications.filter(n => n.id !== id);
    renderNotifications();
}

function markAllRead() {
    notifications.forEach(n => n.isRead = true);
    renderNotifications();
    showToast('All notifications marked as read');
}

function clearAll() {
    if (confirm('Delete all notifications?')) {
        notifications = [];
        renderNotifications();
        showToast('All notifications cleared');
    }
}
