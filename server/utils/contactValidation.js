const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function containsHeaderChars(value) {
  return /[\r\n]/.test(value);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function assertLength(value, maxLength, field, errors) {
  if (value.length > maxLength) {
    errors.push(`${field} must be ${maxLength} characters or fewer.`);
  }
}

export function validateContactPayload(payload, minFormFillMs) {
  const input =
    payload && typeof payload === "object" && !Array.isArray(payload) ? payload : {};

  const name = normalizeText(input.name);
  const email = normalizeText(input.email).toLowerCase();
  const subject = normalizeText(input.subject);
  const message = normalizeText(input.message);
  const company = normalizeText(input.company);
  const formStartedAt = Number(input.formStartedAt);
  const errors = [];

  if (!name) errors.push("Name is required.");
  if (!email) errors.push("Email is required.");
  if (!subject) errors.push("Subject is required.");
  if (!message) errors.push("Message is required.");

  assertLength(name, 80, "Name", errors);
  assertLength(email, 254, "Email", errors);
  assertLength(subject, 120, "Subject", errors);
  assertLength(message, 5000, "Message", errors);

  if (name && containsHeaderChars(name)) {
    errors.push("Name contains invalid characters.");
  }

  if (email && (containsHeaderChars(email) || !EMAIL_REGEX.test(email))) {
    errors.push("Email address is invalid.");
  }

  if (subject && containsHeaderChars(subject)) {
    errors.push("Subject contains invalid characters.");
  }

  if (message && containsHeaderChars(message) && /\n\s*(to:|bcc:|cc:)/i.test(message)) {
    errors.push("Message contains blocked content.");
  }

  if (!Number.isFinite(formStartedAt)) {
    errors.push("Form timing metadata is missing.");
  }

  return {
    errors,
    contact: {
      name,
      email,
      subject,
      message,
      company,
      formStartedAt,
    },
    isSpamTrapTriggered: company.length > 0,
    isTooFast:
      Number.isFinite(formStartedAt) && Date.now() - formStartedAt < minFormFillMs,
  };
}

export function sanitizeForEmail(contact) {
  return {
    ...contact,
    name: escapeHtml(contact.name),
    email: escapeHtml(contact.email),
    subject: escapeHtml(contact.subject),
    message: escapeHtml(contact.message).replaceAll("\n", "<br />"),
  };
}
