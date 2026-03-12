import { config } from "../config.js";
import { sendContactEmails } from "../services/emailService.js";
import {
  sanitizeForEmail,
  validateContactPayload,
} from "../utils/contactValidation.js";
import { logger } from "../utils/logger.js";
import { checkContactRateLimit } from "../utils/requestRateLimit.js";

export async function processContactSubmission({ body, ip = "unknown" }) {
  const rawEmail =
    body && typeof body === "object" && !Array.isArray(body)
      ? String(body.email || "").trim().toLowerCase()
      : "";
  const rateLimitResult = checkContactRateLimit({
    ip,
    email: rawEmail,
  });

  if (!rateLimitResult.allowed) {
    logger.warn("Rate limit triggered for contact submission", {
      ip,
      email: rawEmail || "unknown",
      retryAfterMs: rateLimitResult.retryAfterMs,
    });

    return {
      status: 429,
      payload: {
        error: "Too many contact attempts from this address. Please try again later.",
      },
      headers: {
        "Retry-After": String(
          Math.max(1, Math.ceil(rateLimitResult.retryAfterMs / 1000))
        ),
      },
    };
  }

  const validation = validateContactPayload(body, config.minFormFillMs);

  if (validation.isSpamTrapTriggered || validation.isTooFast) {
    logger.warn("Blocked suspected spam contact submission", {
      ip,
      email: validation.contact.email || "unknown",
      isSpamTrapTriggered: validation.isSpamTrapTriggered,
      isTooFast: validation.isTooFast,
    });

    return {
      status: 202,
      payload: {
        message: "Message received.",
      },
    };
  }

  if (validation.errors.length > 0) {
    return {
      status: 400,
      payload: {
        error: validation.errors[0],
        details: validation.errors,
      },
    };
  }

  try {
    const safeContact = sanitizeForEmail(validation.contact);

    await sendContactEmails(validation.contact, safeContact);

    logger.info("Contact form submission processed", {
      ip,
      email: validation.contact.email,
      subject: validation.contact.subject,
    });

    return {
      status: 202,
      payload: {
        message: "Message sent, check your email.",
      },
    };
  } catch (error) {
    logger.error("Contact form submission failed", {
      ip,
      email: validation.contact.email,
      error: error.message,
    });

    return {
      status: 500,
      payload: {
        error: "Failed to send message. Please try again.",
      },
    };
  }
}
