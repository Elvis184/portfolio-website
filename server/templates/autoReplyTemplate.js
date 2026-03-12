export function buildAutoReplyHtml({
  recipientName,
  originalSubject,
  responseWindow,
}) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>We received your message</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,sans-serif;color:#10233c;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f7fb;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:20px;overflow:hidden;">
            <tr>
              <td style="padding:32px;background:linear-gradient(135deg,#0f172a,#1d4ed8);color:#ffffff;">
                <p style="margin:0 0 8px;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;opacity:0.78;">
                  Elvion Tech
                </p>
                <h1 style="margin:0;font-size:28px;line-height:1.25;">Thanks for reaching out</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">
                  Hi ${recipientName},
                </p>
                <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">
                  Thank you for contacting Elvion Tech. This is a confirmation that your message has been received successfully.
                </p>
                <p style="margin:0 0 20px;font-size:16px;line-height:1.7;">
                  I will review your note about <strong>${originalSubject}</strong> and reply ${responseWindow}.
                </p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 24px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:14px;">
                  <tr>
                    <td style="padding:20px;">
                      <p style="margin:0 0 8px;font-size:14px;font-weight:700;color:#1d4ed8;">What happens next</p>
                      <p style="margin:0;font-size:15px;line-height:1.7;color:#1e3a5f;">
                        If your request includes technical or project details, I may follow up with a few clarifying questions so I can give you a precise response.
                      </p>
                    </td>
                  </tr>
                </table>
                <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">
                  If your message is urgent, you can reply directly to this email and it will reach me.
                </p>
                <p style="margin:0;font-size:16px;line-height:1.7;">
                  Best regards,<br />
                  Elvion Tech
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;">
                <p style="margin:0;font-size:13px;line-height:1.6;color:#475569;">
                  This confirmation was sent because you submitted the contact form on the Elvion Tech website.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function buildAutoReplyText({
  recipientName,
  originalSubject,
  responseWindow,
}) {
  return `Hi ${recipientName},

Thank you for contacting Elvion Tech. This is a confirmation that your message has been received successfully.

I will review your note about "${originalSubject}" and reply ${responseWindow}.

If your request includes technical or project details, I may follow up with a few clarifying questions so I can give you a precise response.

If your message is urgent, you can reply directly to this email and it will reach me.

Best regards,
Elvion Tech`;
}
