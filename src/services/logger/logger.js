/**
 * logger.js
 * Structured application logger.
 * In development: logs to console.
 * In production: ready to pipe to Supabase analytics or external service.
 */

const IS_DEV = import.meta.env.DEV;
const LOG_BUFFER = [];
const MAX_BUFFER = 100;

const LEVELS = {
  DEBUG: "DEBUG",
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
  AI: "AI",
  PERF: "PERF",
  AUTH: "AUTH",
};

function createEntry(level, category, message, data = {}) {
  return {
    level,
    category,
    message,
    data,
    timestamp: new Date().toISOString(),
    sessionId: getSessionId(),
  };
}

function emit(entry) {
  // Buffer for batch export / analytics
  LOG_BUFFER.push(entry);
  if (LOG_BUFFER.length > MAX_BUFFER) LOG_BUFFER.shift();

  if (!IS_DEV) return; // Suppress console in production builds

  const prefix = `[BharatOne:${entry.category}]`;
  switch (entry.level) {
    case LEVELS.ERROR:
      console.error(prefix, entry.message, entry.data);
      break;
    case LEVELS.WARN:
      console.warn(prefix, entry.message, entry.data);
      break;
    case LEVELS.DEBUG:
      console.debug(prefix, entry.message, entry.data);
      break;
    default:
      console.log(prefix, entry.message, entry.data);
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

export const logger = {
  debug: (message, data) =>
    emit(createEntry(LEVELS.DEBUG, "APP", message, data)),
  info: (message, data) => emit(createEntry(LEVELS.INFO, "APP", message, data)),
  warn: (message, data) => emit(createEntry(LEVELS.WARN, "APP", message, data)),
  error: (message, data) =>
    emit(createEntry(LEVELS.ERROR, "APP", message, data)),

  ai: {
    request: (query, module) =>
      emit(
        createEntry(LEVELS.AI, "AI_REQUEST", `Query sent to Gemini`, {
          query,
          module,
        }),
      ),
    response: (module, tokenCount) =>
      emit(
        createEntry(LEVELS.AI, "AI_RESPONSE", `Response received`, {
          module,
          tokenCount,
        }),
      ),
    error: (error) =>
      emit(
        createEntry(LEVELS.ERROR, "AI_ERROR", error.message || "Gemini error", {
          error,
        }),
      ),
  },

  auth: {
    login: (method) =>
      emit(createEntry(LEVELS.AUTH, "AUTH", "User logged in", { method })),
    logout: () => emit(createEntry(LEVELS.AUTH, "AUTH", "User logged out")),
    error: (error) =>
      emit(createEntry(LEVELS.ERROR, "AUTH", "Auth error", { error })),
  },

  perf: {
    mark: (label, durationMs) =>
      emit(
        createEntry(LEVELS.PERF, "PERF", `${label}: ${durationMs}ms`, {
          durationMs,
        }),
      ),
  },

  upload: {
    start: (fileName, size) =>
      emit(
        createEntry(LEVELS.INFO, "UPLOAD", "Upload started", {
          fileName,
          size,
        }),
      ),
    success: (fileName) =>
      emit(createEntry(LEVELS.INFO, "UPLOAD", "Upload complete", { fileName })),
    error: (fileName, error) =>
      emit(
        createEntry(LEVELS.ERROR, "UPLOAD", "Upload failed", {
          fileName,
          error,
        }),
      ),
  },

  /** Returns the in-memory log buffer (for diagnostics / export). */
  getBuffer: () => [...LOG_BUFFER],
  clearBuffer: () => {
    LOG_BUFFER.length = 0;
  },
};

// ─── Session ID ───────────────────────────────────────────────────────────────
function getSessionId() {
  let sid = sessionStorage.getItem("bharatone_session_id");
  if (!sid) {
    sid = `sid_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    sessionStorage.setItem("bharatone_session_id", sid);
  }
  return sid;
}

export default logger;
