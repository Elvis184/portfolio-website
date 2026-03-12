import cors from "cors";
import express from "express";
import helmet from "helmet";
import { config } from "./config.js";
import { contactRateLimit } from "./middleware/contactRateLimit.js";
import contactRouter from "./routes/contact.js";

export function createApp() {
  const app = express();

  if (config.trustProxy) {
    app.set("trust proxy", 1);
  }

  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    })
  );

  app.use(
    cors({
      origin: config.allowedOrigin,
      methods: ["POST"],
    })
  );

  app.use(express.json({ limit: "25kb" }));

  app.get("/api/health", (_request, response) => {
    response.json({ ok: true });
  });

  app.use("/api/contact", contactRateLimit, contactRouter);

  app.use((error, _request, response, _next) => {
    if (error instanceof SyntaxError) {
      return response.status(400).json({
        error: "Invalid JSON payload.",
      });
    }

    return response.status(500).json({
      error: "Unexpected server error.",
    });
  });

  return app;
}
