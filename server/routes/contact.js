import { Router } from "express";
import { config } from "../config.js";
import { sendContactEmails } from "../services/emailService.js";
import {
  sanitizeForEmail,
  validateContactPayload,
} from "../utils/contactValidation.js";
import { logger } from "../utils/logger.js";

const router = Router();

router.post("/", async (request, response) => {
  const validation = validateContactPayload(request.body, config.minFormFillMs);

  if (validation.isSpamTrapTriggered || validation.isTooFast) {
    logger.warn("Blocked suspected spam contact submission", {
      ip: request.ip,
      email: validation.contact.email || "unknown",
      isSpamTrapTriggered: validation.isSpamTrapTriggered,
      isTooFast: validation.isTooFast,
    });

    return response.status(202).json({
      message: "Message received.",
    });
  }

  if (validation.errors.length > 0) {
    return response.status(400).json({
      error: validation.errors[0],
      details: validation.errors,
    });
  }

  try {
    const safeContact = sanitizeForEmail(validation.contact);

    await sendContactEmails(validation.contact, safeContact);

    logger.info("Contact form submission processed", {
      ip: request.ip,
      email: validation.contact.email,
      subject: validation.contact.subject,
    });

    return response.status(202).json({
      message:
        "Thanks for reaching out. Your message has been delivered and a confirmation email has been sent.",
    });
  } catch (error) {
    logger.error("Contact form submission failed", {
      ip: request.ip,
      email: validation.contact.email,
      error: error.message,
    });

    return response.status(500).json({
      error:
        "We could not send your message right now. Please try again in a few minutes.",
    });
  }
});

export default router;
