/**
 * notificationEngine.js
 * Seeds and manages in-app notifications.
 */

const STORAGE_KEY = "bharatone_notifications";

export function getNotifications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : getDefaultNotifications();
  } catch {
    return getDefaultNotifications();
  }
}

export function markAllRead() {
  const notifications = getNotifications().map((n) => ({ ...n, read: true }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  return notifications;
}

export function markRead(id) {
  const notifications = getNotifications().map((n) =>
    n.id === id ? { ...n, read: true } : n,
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  return notifications;
}

export function deleteNotification(id) {
  const notifications = getNotifications().filter((n) => n.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  return notifications;
}

export function getUnreadCount(notifications) {
  return notifications.filter((n) => !n.read).length;
}

function getDefaultNotifications() {
  return [
    {
      id: 1,
      category: "Government",
      title: "नई योजना अधिसूचना",
      body: "आपके जिले में 'PM Awas Yojana' के लिए आवेदन प्रारंभ हो गए हैं।",
      read: false,
      timestamp: new Date(Date.now() - 1800000).toISOString(),
    },
    {
      id: 2,
      category: "Career",
      title: "SSC CGL 2026 — आवेदन तिथि",
      body: "आवेदन की अंतिम तिथि: 25 अप्रैल, 2026. अभी आवेदन करें।",
      read: false,
      timestamp: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      id: 3,
      category: "Security",
      title: "नया डिवाइस लॉगिन",
      body: "आपके खाते में एक नए डिवाइस से लॉगिन किया गया है।",
      read: true,
      timestamp: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 4,
      category: "Healthcare",
      title: "दवाई अनुस्मारक (Medicine Reminder)",
      body: "आपकी दवाई 'Metformin 500mg' की समय सीमा आज है।",
      read: false,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 5,
      category: "Finance",
      title: "बजट अनुस्मारक (Budget Alert)",
      body: "इस महीने आपका खर्च आय के 85% तक पहुँच गया है।",
      read: true,
      timestamp: new Date(Date.now() - 172800000).toISOString(),
    },
  ];
}
