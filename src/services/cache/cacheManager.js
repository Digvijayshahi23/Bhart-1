/**
 * cacheManager.js
 * Lightweight in-memory + localStorage cache layer.
 * Supports TTL-based expiry.
 */

const CACHE_PREFIX = "bharatone_cache_";
const DEFAULT_TTL_MS = 5 * 60 * 1000; // 5 minutes

// In-memory cache for the current session (fastest reads)
const memoryCache = new Map();

/**
 * Sets a value in both memory and localStorage with optional TTL.
 */
export function setCache(key, value, ttlMs = DEFAULT_TTL_MS) {
  const entry = {
    value,
    expiresAt: Date.now() + ttlMs,
  };
  memoryCache.set(key, entry);

  try {
    localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(entry));
  } catch {
    // Silently ignore storage quota errors
  }
}

/**
 * Gets a cached value. Returns null if missing or expired.
 */
export function getCache(key) {
  // 1. Check memory first
  if (memoryCache.has(key)) {
    const entry = memoryCache.get(key);
    if (Date.now() < entry.expiresAt) return entry.value;
    memoryCache.delete(key);
  }

  // 2. Check localStorage
  try {
    const raw = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    if (!raw) return null;
    const entry = JSON.parse(raw);
    if (Date.now() < entry.expiresAt) {
      memoryCache.set(key, entry); // Warm up memory cache
      return entry.value;
    }
    localStorage.removeItem(`${CACHE_PREFIX}${key}`);
  } catch {
    return null;
  }

  return null;
}

/**
 * Deletes a cache entry from both memory and localStorage.
 */
export function deleteCache(key) {
  memoryCache.delete(key);
  try {
    localStorage.removeItem(`${CACHE_PREFIX}${key}`);
  } catch {
    // ignore
  }
}

/**
 * Clears ALL BharatOne cache entries from localStorage.
 */
export function clearAllCache() {
  memoryCache.clear();
  try {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(CACHE_PREFIX)) keysToRemove.push(key);
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch {
    // ignore
  }
}

/**
 * Cache keys used across the app.
 */
export const CACHE_KEYS = {
  PROFILE: "user_profile",
  SCHEMES: "schemes_list",
  WELFARE: "welfare_schemes",
  AI_LAST_RESPONSE: "ai_last_response",
  BOOKMARKS: "aggregated_bookmarks",
  NOTIFICATIONS: "notifications",
};
