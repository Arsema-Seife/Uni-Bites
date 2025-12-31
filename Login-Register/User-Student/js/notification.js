// Simple notification system
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
