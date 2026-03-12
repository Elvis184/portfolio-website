# Contact Email System

## Recommended Approach

Best production option: a transactional provider such as Resend or SendGrid.

Why:
- Better deliverability than raw SMTP from a personal inbox
- Easier domain authentication with SPF, DKIM, and DMARC
- Built-in suppression, logs, and reputation controls
- Cleaner scaling if the portfolio starts receiving more traffic

Current implementation in this repo:
- Frontend: React contact form posts JSON to `/api/contact`
- Backend: Node.js + Express
- Email delivery: Nodemailer over SMTP

This implementation is the most portable starting point because it works with Gmail app passwords, Google Workspace SMTP relay, SendGrid SMTP, Resend SMTP, or another SMTP provider without changing the app structure.

## Short Architecture Overview

1. Visitor fills the contact form in the React frontend.
2. Frontend sends a `POST` request to `/api/contact`.
3. Express validates and sanitizes the payload, checks anti-spam signals, and rate limits the request.
4. Server sends the inquiry to `info.elviontech@gmail.com`.
5. Server sends a confirmation email back to the visitor.
6. Server logs success, spam blocks, and failures without exposing secrets to the client.

## Implementation Plan

1. Add a backend service dedicated to contact submissions.
2. Store all credentials and operational settings in environment variables.
3. Validate and sanitize `name`, `email`, `subject`, and `message` on the server.
4. Block abuse with rate limiting, a honeypot field, minimum form-fill timing, and strict payload size limits.
5. Prevent header injection by rejecting carriage returns and line breaks in header-like fields.
6. Send two emails:
   - Admin notification to `info.elviontech@gmail.com`
   - Auto-reply to the visitor
7. Return safe user-facing responses and log operational detail server-side.
8. Verify locally with SMTP credentials and deploy behind a trusted origin.
9. For stronger reliability later, move email sending to a queue-backed worker.

## Folder Structure

```text
portfolio-site/
├─ docs/
│  └─ contact-email-system.md
├─ server/
│  ├─ app.js
│  ├─ config.js
│  ├─ index.js
│  ├─ middleware/
│  │  └─ contactRateLimit.js
│  ├─ routes/
│  │  └─ contact.js
│  ├─ services/
│  │  └─ emailService.js
│  ├─ templates/
│  │  ├─ adminNotificationTemplate.js
│  │  └─ autoReplyTemplate.js
│  └─ utils/
│     ├─ contactValidation.js
│     └─ logger.js
├─ src/
│  └─ components/
│     └─ Contact.jsx
├─ .env.example
├─ package.json
└─ vite.config.js
```

## Required Components And Files

- `src/components/Contact.jsx`
  Frontend form submission example with success and error states.
- `server/index.js`
  Bootstraps the backend and verifies SMTP connectivity on startup.
- `server/app.js`
  Express app with `helmet`, CORS, JSON parsing, health route, and contact route.
- `server/routes/contact.js`
  Main API endpoint logic.
- `server/services/emailService.js`
  Email transport and send logic.
- `server/templates/autoReplyTemplate.js`
  HTML and plain-text auto-reply templates.
- `server/templates/adminNotificationTemplate.js`
  Admin email templates.
- `server/utils/contactValidation.js`
  Validation, normalization, HTML escaping, and header-injection defense.
- `server/middleware/contactRateLimit.js`
  IP and email aware rate limiting.
- `server/utils/logger.js`
  Structured JSON console logging.
- `.env.example`
  Required configuration values.

## Required Environment Variables

```env
PORT=8787
NODE_ENV=development
ALLOWED_ORIGIN=http://localhost:5173
TRUST_PROXY=false

CONTACT_ADMIN_EMAIL=info.elviontech@gmail.com
CONTACT_FROM_EMAIL=info.elviontech@gmail.com
AUTO_REPLY_SUBJECT=We received your message
AUTO_REPLY_RESPONSE_WINDOW=within 1 business day

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info.elviontech@gmail.com
SMTP_PASS=replace-with-your-smtp-password-or-app-password

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=5
MIN_FORM_FILL_MS=4000
LOG_LEVEL=info

VITE_CONTACT_API_URL=http://localhost:8787/api/contact
```

## Email Subject Line Suggestions

Recommended auto-reply subject:
- `We received your message`

Other strong options:
- `Thanks for contacting Elvion Tech`
- `Your inquiry has been received`
- `We have your message and will reply soon`

Recommended admin subject:
- `New website inquiry: {{subject}}`

## Setup Instructions

1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env`.
3. Fill in SMTP credentials.
4. If using Gmail:
   - Enable 2-step verification on the mailbox.
   - Create a Google app password.
   - Put that app password in `SMTP_PASS`.
5. Start the API server:
   `npm run dev:server`
6. Start the Vite frontend in another terminal:
   `npm run dev`
7. Open the site and submit the contact form.
8. Confirm:
   - The admin inbox receives the contact message.
   - The sender receives the auto-reply.

## Frontend Submission Example

The active implementation is in:
- [src/components/Contact.jsx](C:/Users/Administrator/Downloads/portfolio-site/src/components/Contact.jsx)

It sends:
- `name`
- `email`
- `subject`
- `message`
- `company` as a honeypot field
- `formStartedAt` for anti-bot timing checks

## Security Checklist

- Use server-side validation for every field, not only browser validation.
- Reject CR and LF characters in `name`, `email`, and `subject` to prevent header injection.
- Limit payload size with `express.json({ limit: "25kb" })`.
- Enforce CORS to your frontend origin only.
- Use `helmet` to set defensive HTTP headers.
- Rate limit by IP and normalized email.
- Add a hidden honeypot field and silently accept trapped submissions.
- Reject unrealistically fast submissions using `MIN_FORM_FILL_MS`.
- Escape HTML before injecting contact content into email templates.
- Never trust `replyTo` unless the email address passes strict validation.
- Keep SMTP secrets only in environment variables.
- Use a transactional provider and authenticate your sending domain with SPF, DKIM, and DMARC in production.
- Avoid reflecting backend errors verbatim to the browser.

## Preventing Abuse And Header Injection

Current code protections:
- `server/utils/contactValidation.js` rejects newline characters in header fields.
- `server/utils/contactValidation.js` validates email format before using it as `replyTo`.
- `server/middleware/contactRateLimit.js` throttles repeat submissions.
- `src/components/Contact.jsx` includes a honeypot field named `company`.
- `src/components/Contact.jsx` includes `formStartedAt`, and the API rejects submissions that arrive too quickly.

Additional production hardening worth considering:
- Add CAPTCHA only if spam becomes a real issue.
- Put the endpoint behind a CDN or WAF.
- Use Redis-backed shared rate limiting if you deploy multiple server instances.
- Queue outgoing email jobs instead of sending synchronously in the request path.

## Logging Recommendations

Log these events in structured JSON:
- Successful contact submission
- Auto-reply failure
- Validation failure patterns
- Rate-limit rejections
- Honeypot and timing-based spam blocks
- SMTP startup verification result

Do not log:
- SMTP passwords
- Full raw request headers
- Session cookies

Recommended operational additions later:
- Forward logs to a provider such as Datadog, Better Stack, or Logtail
- Add an alert when repeated SMTP failures occur
- Track message volume and bounce rates in the email provider dashboard

## Testing Instructions

1. Health check:
   Open `http://localhost:8787/api/health`
2. Successful path:
   Submit a real form entry and confirm both emails arrive.
3. Validation:
   Try empty fields, overlong values, and an invalid email.
4. Header injection:
   Try a subject like `Hello%0ABcc:test@example.com` and confirm it is rejected.
5. Honeypot:
   Manually fill `company` in DevTools and confirm the server returns a generic success without sending mail.
6. Too-fast submission:
   Submit immediately after page load and confirm it is treated as suspicious.
7. Rate limiting:
   Send more than `RATE_LIMIT_MAX` requests inside the configured window.
8. SMTP failure:
   Break `SMTP_PASS` temporarily and confirm startup fails with a clear server log.
9. Frontend resilience:
   Stop the API server and confirm the UI shows a safe error message.

## Deployment Considerations

- Run the frontend and backend over HTTPS only.
- Set `ALLOWED_ORIGIN` to the exact production frontend URL.
- Set `TRUST_PROXY=true` when running behind platforms such as Render, Railway, Fly.io, or Nginx.
- Prefer a verified custom domain email such as `hello@yourdomain.com` over a free mailbox for better deliverability.
- If the app scales beyond one instance, move rate limiting to Redis and move email delivery to a queue worker.
- Monitor spam complaint rate, bounce rate, and SMTP errors after launch.
- Keep `.env` out of version control and inject secrets through the hosting platform.

## Reliability Note

This implementation sends the admin email first and then attempts the auto-reply. That protects the main business requirement, which is receiving the inquiry. For full production reliability, the next step is a background queue with retries and dead-letter handling.
