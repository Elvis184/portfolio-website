import dotenv from "dotenv";

dotenv.config();

function getBoolean(value, fallback = false) {
  if (value === undefined) {
    return fallback;
  }

  return value === "true";
}

function getNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export const config = {
  env: process.env.NODE_ENV || "development",
  port: getNumber(process.env.PORT, 8787),
  allowedOrigin: process.env.ALLOWED_ORIGIN || "http://localhost:5173",
  trustProxy: getBoolean(process.env.TRUST_PROXY, false),
  emailTransportMode: process.env.EMAIL_TRANSPORT_MODE || "smtp",
  adminEmail: process.env.CONTACT_ADMIN_EMAIL || "info.elviontech@gmail.com",
  fromEmail: process.env.CONTACT_FROM_EMAIL || "info.elviontech@gmail.com",
  autoReplySubject:
    process.env.AUTO_REPLY_SUBJECT || "Thanks for contacting Elvion Tech",
  autoReplyResponseWindow:
    process.env.AUTO_REPLY_RESPONSE_WINDOW || "within 1 business day",
  smtp: {
    host: process.env.SMTP_HOST || "",
    port: getNumber(process.env.SMTP_PORT, 587),
    secure: getBoolean(process.env.SMTP_SECURE, false),
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    rejectUnauthorized: getBoolean(
      process.env.SMTP_TLS_REJECT_UNAUTHORIZED,
      true
    ),
  },
  rateLimitWindowMs: getNumber(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
  rateLimitMax: getNumber(process.env.RATE_LIMIT_MAX, 5),
  minFormFillMs: getNumber(process.env.MIN_FORM_FILL_MS, 4000),
  logLevel: process.env.LOG_LEVEL || "info",
};

export function validateConfig() {
  const missing = [];

  if (!config.adminEmail) missing.push("CONTACT_ADMIN_EMAIL");
  if (!config.fromEmail) missing.push("CONTACT_FROM_EMAIL");

  if (config.emailTransportMode === "smtp") {
    if (!config.smtp.host) missing.push("SMTP_HOST");
    if (!config.smtp.user) missing.push("SMTP_USER");
    if (!config.smtp.pass) missing.push("SMTP_PASS");
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
}
