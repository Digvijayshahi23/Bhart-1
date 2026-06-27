/**
 * historyManager.js
 * Manages search and chat history from localStorage.
 */

const SEARCH_KEY = "bharatone_search_history";
const CHAT_KEY = "bharatone_chat_history";

// --- Search History ---
export function getSearchHistory() {
  try {
    const raw = localStorage.getItem(SEARCH_KEY);
    return raw ? JSON.parse(raw) : getDefaultSearches();
  } catch {
    return getDefaultSearches();
  }
}

export function addSearch(query, module = "global") {
  const history = getSearchHistory();
  const entry = {
    id: Date.now(),
    query,
    module,
    timestamp: new Date().toISOString(),
    pinned: false,
  };
  const updated = [entry, ...history.filter((h) => h.query !== query)].slice(
    0,
    30,
  );
  localStorage.setItem(SEARCH_KEY, JSON.stringify(updated));
  return updated;
}

export function deleteSearch(id) {
  const history = getSearchHistory().filter((h) => h.id !== id);
  localStorage.setItem(SEARCH_KEY, JSON.stringify(history));
  return history;
}

export function clearSearchHistory() {
  localStorage.removeItem(SEARCH_KEY);
}

function getDefaultSearches() {
  return [
    {
      id: 1,
      query: "पीएम किसान योजना पात्रता",
      module: "schemes",
      timestamp: new Date().toISOString(),
      pinned: false,
    },
    {
      id: 2,
      query: "UPI धोखाधड़ी शिकायत कैसे करें",
      module: "legal",
      timestamp: new Date().toISOString(),
      pinned: true,
    },
    {
      id: 3,
      query: "UPSC 2026 परीक्षा तिथि",
      module: "career",
      timestamp: new Date().toISOString(),
      pinned: false,
    },
  ];
}

// --- Chat History ---
export function getChatHistory() {
  try {
    const raw = localStorage.getItem(CHAT_KEY);
    return raw ? JSON.parse(raw) : getDefaultChats();
  } catch {
    return getDefaultChats();
  }
}

export function deleteChatEntry(id) {
  const history = getChatHistory().filter((c) => c.id !== id);
  localStorage.setItem(CHAT_KEY, JSON.stringify(history));
  return history;
}

function getDefaultChats() {
  return [
    {
      id: 1,
      title: "वृद्धावस्था पेंशन योजना",
      module: "Government",
      date: "आज, 12:30 PM",
      pinned: false,
    },
    {
      id: 2,
      title: "UPI Fraud — Steps to Report",
      module: "Legal",
      date: "कल, 4:15 PM",
      pinned: true,
    },
    {
      id: 3,
      title: "Prescription: Crocin 500mg",
      module: "Healthcare",
      date: "25 जून, 2026",
      pinned: false,
    },
  ];
}
