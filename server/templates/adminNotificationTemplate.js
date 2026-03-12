export function buildAdminNotificationHtml(contact) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>New contact form submission</title>
  </head>
  <body style="margin:0;padding:24px;background:#f8fafc;font-family:Arial,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;">
      <tr>
        <td style="padding:24px 24px 12px;">
          <h1 style="margin:0;font-size:24px;">New website inquiry</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:0 24px 24px;">
          <p style="margin:0 0 8px;"><strong>Name:</strong> ${contact.name}</p>
          <p style="margin:0 0 8px;"><strong>Email:</strong> ${contact.email}</p>
          <p style="margin:0 0 8px;"><strong>Subject:</strong> ${contact.subject}</p>
          <p style="margin:0;"><strong>Message:</strong></p>
          <p style="margin:12px 0 0;line-height:1.7;">${contact.message}</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function buildAdminNotificationText(contact) {
  return `New website inquiry

Name: ${contact.name}
Email: ${contact.email}
Subject: ${contact.subject}

Message:
${contact.message.replaceAll("<br />", "\n")}`;
}
