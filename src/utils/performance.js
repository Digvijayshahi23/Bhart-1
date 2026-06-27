/**
 * performance.js
 * Performance utility hooks and helpers.
 * Debounce, throttle, measure, and deferred execution.
 */

/**
 * Returns a debounced version of fn.
 * @param {Function} fn - Function to debounce
 * @param {number} delayMs - Debounce delay in milliseconds
 */
export function debounce(fn, delayMs = 300) {
  let timer = null;
  const debounced = function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delayMs);
  };
  debounced.cancel = () => clearTimeout(timer);
  return debounced;
}

/**
 * Returns a throttled version of fn.
 * @param {Function} fn - Function to throttle
 * @param {number} intervalMs - Minimum interval between calls
 */
export function throttle(fn, intervalMs = 300) {
  let lastCalled = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCalled >= intervalMs) {
      lastCalled = now;
      return fn.apply(this, args);
    }
  };
}

/**
 * Measures how long an async operation takes.
 * Returns { result, durationMs }.
 */
export async function measureAsync(label, asyncFn) {
  const start = performance.now();
  try {
    const result = await asyncFn();
    const durationMs = Math.round(performance.now() - start);
    if (import.meta.env.DEV) {
      console.debug(`[Perf] ${label}: ${durationMs}ms`);
    }
    return { result, durationMs };
  } catch (error) {
    const durationMs = Math.round(performance.now() - start);
    console.error(`[Perf] ${label} failed after ${durationMs}ms`, error);
    throw error;
  }
}

/**
 * Defers non-critical work until the browser is idle.
 * Falls back to setTimeout when requestIdleCallback is unsupported.
 */
export function runWhenIdle(fn, timeout = 2000) {
  if (typeof requestIdleCallback !== "undefined") {
    requestIdleCallback(fn, { timeout });
  } else {
    setTimeout(fn, 1);
  }
}

/**
 * Prefetches a route's dynamic import chunk without rendering it.
 * @param {Function} importFn - () => import('./MyPage')
 */
export function prefetchRoute(importFn) {
  runWhenIdle(() => {
    importFn().catch(() => {}); // Silently prefetch
  });
}
