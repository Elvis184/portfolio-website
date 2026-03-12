import { config } from "../config.js";

const buckets = new Map();

function cleanupExpired(now) {
  for (const [key, entry] of buckets.entries()) {
    if (entry.expiresAt <= now) {
      buckets.delete(key);
    }
  }
}

export function checkContactRateLimit({ ip = "unknown", email = "" }) {
  const now = Date.now();
  cleanupExpired(now);

  const key = `${ip}:${String(email).trim().toLowerCase()}`;
  const existing = buckets.get(key);

  if (!existing || existing.expiresAt <= now) {
    buckets.set(key, {
      count: 1,
      expiresAt: now + config.rateLimitWindowMs,
    });

    return {
      allowed: true,
      remaining: config.rateLimitMax - 1,
    };
  }

  if (existing.count >= config.rateLimitMax) {
    return {
      allowed: false,
      retryAfterMs: existing.expiresAt - now,
    };
  }

  existing.count += 1;

  return {
    allowed: true,
    remaining: config.rateLimitMax - existing.count,
  };
}
