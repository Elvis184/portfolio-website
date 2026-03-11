# Formspree Setup

Use this setup to make the contact form send real emails and automatically reply to the visitor after submission.

## 1. Create a Formspree Form

1. Go to `https://formspree.io/`
2. Create an account or sign in
3. Create a new form
4. Copy your form endpoint

It will look like:

```text
https://formspree.io/f/your-form-id
```

## 2. Add the Endpoint to Your Environment

Create a `.env` file in the project root and add:

```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

For Vercel:

1. Open your project settings
2. Go to `Environment Variables`
3. Add:

```text
Name: VITE_FORMSPREE_ENDPOINT
Value: https://formspree.io/f/your-form-id
```

4. Redeploy the project

## 3. Enable Auto Reply in Formspree

In your Formspree dashboard:

1. Open the form
2. Go to `Settings` or `Integrations/Workflows` depending on the UI
3. Enable `Autoresponse`
4. Set the reply-to field to the visitor email field

Use this subject:

```text
We received your message
```

Use this message body:

```text
Hi,

Thank you for reaching out. Your message has been received successfully.

I will review your request and get back to you as soon as possible with the next steps.

Best regards,
Elvis Carter
```

## 4. Expected Form Fields Already Sent by This Site

The website already sends these fields:

- `name`
- `email`
- `projectType`
- `message`
- `_subject`
- `_gotcha`
- `auto_reply_message`

## 5. What Happens After Setup

- The visitor submits the form
- Formspree sends you the submission
- Formspree sends an automatic reply to the visitor's email

## 6. Important Note

The website code is ready, but email auto-reply will not work until:

- `VITE_FORMSPREE_ENDPOINT` is set
- Formspree autoresponse is enabled
