import nodemailer from "nodemailer";
import { config } from "../config.js";
import {
  buildAutoReplyHtml,
  buildAutoReplyText,
} from "../templates/autoReplyTemplate.js";
import {
  buildAdminNotificationHtml,
  buildAdminNotificationText,
} from "../templates/adminNotificationTemplate.js";
import { logger } from "../utils/logger.js";

const transporter =
  config.emailTransportMode === "smtp"
    ? nodemailer.createTransport({
        host: config.smtp.host,
        port: config.smtp.port,
        secure: config.smtp.secure,
        auth: {
          user: config.smtp.user,
          pass: config.smtp.pass,
        },
        tls: {
          rejectUnauthorized: config.smtp.rejectUnauthorized,
        },
      })
    : null;

export async function verifyEmailTransport() {
  if (config.emailTransportMode !== "smtp") {
    logger.warn("Email transport verification skipped", {
      mode: config.emailTransportMode,
    });
    return;
  }

  await transporter.verify();
  logger.info("SMTP connection verified");
}

export async function sendContactEmails(contact, safeContact) {
  const adminSubject = `New website inquiry: ${contact.subject}`;

  if (config.emailTransportMode !== "smtp") {
    logger.info("Email delivery skipped in non-SMTP mode", {
      mode: config.emailTransportMode,
      adminEmail: config.adminEmail,
      visitorEmail: contact.email,
      subject: adminSubject,
    });
    return;
  }

  await transporter.sendMail({
    from: `"Elvion Tech Website" <${config.fromEmail}>`,
    to: config.adminEmail,
    replyTo: contact.email,
    subject: adminSubject,
    html: buildAdminNotificationHtml(safeContact),
    text: buildAdminNotificationText(contact),
  });

  try {
    await transporter.sendMail({
      from: `"Elvion Tech" <${config.fromEmail}>`,
      to: contact.email,
      replyTo: config.fromEmail,
      subject: config.autoReplySubject,
      html: buildAutoReplyHtml({
        recipientName: safeContact.name,
        originalSubject: safeContact.subject,
        responseWindow: config.autoReplyResponseWindow,
      }),
      text: buildAutoReplyText({
        recipientName: contact.name,
        originalSubject: contact.subject,
        responseWindow: config.autoReplyResponseWindow,
      }),
    });
  } catch (error) {
    logger.error("Failed to send auto-reply email", {
      email: contact.email,
      error: error.message,
    });
  }
}
