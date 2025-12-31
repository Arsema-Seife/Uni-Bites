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
