/**
 * Strict regex-based input validation and sanitization to prevent XSS attacks.
 * Filters HTML tags, javascript: schemes, and inline event handlers (onxxx=).
 */
export function sanitizeInput(value) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/<[^>]*>/g, '')                  // Remove HTML tags
    .replace(/javascript:/gi, '')            // Block javascript URL schemes
    .replace(/on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]*)/gi, '') // Strip inline event handlers like onclick="js"
    .replace(/eval\((.*)\)/gi, '')           // Block eval calls
    .trim();
}
