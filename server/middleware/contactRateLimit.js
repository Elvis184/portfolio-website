import rateLimit from "express-rate-limit";
import { config } from "../config.js";

export const contactRateLimit = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many contact attempts from this address. Please try again later.",
  },
  keyGenerator: (request) => {
    const email = typeof request.body?.email === "string"
      ? request.body.email.trim().toLowerCase()
      : "";

    return `${request.ip}:${email}`;
  },
});
