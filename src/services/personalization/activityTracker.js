/**
 * activityTracker.js
 * Reads and writes user activity logs from localStorage.
 */

const STORAGE_KEY = "bharatone_activity_log";

export function getActivityLog() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : getDefaultActivity();
  } catch {
    return getDefaultActivity();
  }
}

export function addActivity(entry) {
  const log = getActivityLog();
  const newEntry = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    ...entry,
  };
  const updated = [newEntry, ...log].slice(0, 50); // Keep last 50 activities
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function clearActivityLog() {
  localStorage.removeItem(STORAGE_KEY);
}

function getDefaultActivity() {
  return [
    {
      id: 1,
      type: "login",
      title: "पोर्टल में प्रवेश (Login)",
      module: "auth",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 2,
      type: "bookmark",
      title: "सहेजी गई योजना: 'पीएम किसान सम्मान'",
      module: "schemes",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 3,
      type: "upload",
      title: "दस्तावेज़ अपलोड: 'Aadhaar Card.pdf'",
      module: "documents",
      timestamp: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      id: 4,
      type: "chat",
      title: "AI चर्चा: 'वृद्धावस्था पेंशन योजना'",
      module: "chat",
      timestamp: new Date(Date.now() - 259200000).toISOString(),
    },
  ];
}
