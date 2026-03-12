import { processContactSubmission } from "../server/handlers/processContactSubmission.js";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({
      error: "Method not allowed.",
    });
  }

  let body;

  try {
    body = typeof request.body === "string" ? JSON.parse(request.body) : request.body;
  } catch {
    return response.status(400).json({
      error: "Invalid JSON payload.",
    });
  }

  const forwardedFor = request.headers["x-forwarded-for"];
  const ip =
    (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor || "")
      .split(",")[0]
      .trim() || request.socket?.remoteAddress || "unknown";

  const result = await processContactSubmission({
    body,
    ip,
  });

  if (result.headers) {
    Object.entries(result.headers).forEach(([name, value]) => {
      response.setHeader(name, value);
    });
  }

  return response.status(result.status).json(result.payload);
}
