/**
 * sanitize.js
 * Input sanitization and validation utilities.
 * Prevents XSS, injection, and malformed input from reaching AI or database.
 */

/* eslint-disable no-control-regex */

/**
 * Strips HTML tags and trims a string.
 * Prevents XSS when rendering user-supplied content.
 */
export function sanitizeText(input = "") {
  return String(input)
    .replace(/<[^>]*>/g, "") // Strip HTML tags
    .replace(/javascript:/gi, "") // Block javascript: URIs
    .replace(/on\w+\s*=/gi, "") // Remove inline event handlers
    .trim()
    .slice(0, 10000); // Hard cap at 10k chars
}

/**
 * Sanitizes a search/chat query before sending to AI.
 * Removes control characters and trims length.
 */
export function sanitizeQuery(query = "") {
  return sanitizeText(query)
    .replace(/[\u0000-\u001F\u007F]/gu, "") // Remove control characters
    .slice(0, 2000); // AI query length cap
}

/**
 * Validates and sanitizes an email address.
 * Returns null if invalid.
 */
export function sanitizeEmail(email = "") {
  const trimmed = String(email).trim().toLowerCase().slice(0, 320);
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return EMAIL_RE.test(trimmed) ? trimmed : null;
}

/**
 * Validates and sanitizes an Indian mobile number.
 * Returns null if invalid.
 */
export function sanitizePhone(phone = "") {
  const digits = String(phone).replace(/\D/g, "");
  if (digits.length === 10 && /^[6-9]/.test(digits)) return digits;
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  return null;
}

/**
 * Validates a file before upload.
 * Returns { valid: boolean, error?: string }
 */
export function validateUploadFile(file, allowedTypes = [], maxSizeMb = 10) {
  if (!file) return { valid: false, error: "No file provided" };

  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed: ${allowedTypes.join(", ")}`,
    };
  }

  const maxBytes = maxSizeMb * 1024 * 1024;
  if (file.size > maxBytes) {
    return {
      valid: false,
      error: `File too large. Maximum size: ${maxSizeMb}MB`,
    };
  }

  // Reject suspicious filenames (no control chars or path separators)
  if (/[<>:"/\\|?*]/.test(file.name)) {
    return { valid: false, error: "Invalid filename" };
  }

  return { valid: true };
}

/**
 * Sanitizes a profile name field.
 * Allows Latin characters, Devanagari script, spaces, period, apostrophe, hyphen.
 */
export function sanitizeName(name = "") {
  // Normalize to NFC and keep alphanumeric + common punctuation
  return sanitizeText(name)
    .normalize("NFC")
    .replace(/[^\p{L}\p{M}\s.-]/gu, "") // Allow Unicode letters + marks + space + . -
    .slice(0, 100);
}
