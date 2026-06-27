/**
 * bookmarkManager.js
 * Aggregates bookmarks from all modules (career, legal, healthcare, schemes, finance).
 */

const MODULES_MAP = {
  career_bookmarks: "Career",
  legal_bookmarks: "Legal",
  finance_bookmarks: "Finance",
};

/**
 * Reads all bookmark keys from localStorage and merges them into a unified list.
 */
export function getAllBookmarks() {
  const results = [];

  Object.entries(MODULES_MAP).forEach(([key, moduleLabel]) => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const ids = JSON.parse(raw);
        ids.forEach((id) => {
          results.push({
            id,
            module: moduleLabel,
            storageKey: key,
          });
        });
      }
    } catch {
      // Skip malformed keys
    }
  });

  return results;
}

/**
 * Removes a bookmark from its module-specific localStorage key.
 */
export function removeBookmark(id, storageKey) {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return;
    const ids = JSON.parse(raw).filter((b) => b !== id);
    localStorage.setItem(storageKey, JSON.stringify(ids));
  } catch {
    // Silently fail
  }
}

/**
 * Total count of all bookmarks across modules.
 */
export function getBookmarkCount() {
  return getAllBookmarks().length;
}
