import { createApp } from "./app.js";
import { config, validateConfig } from "./config.js";
import { verifyEmailTransport } from "./services/emailService.js";
import { logger } from "./utils/logger.js";

async function startServer() {
  try {
    validateConfig();
    await verifyEmailTransport();

    const app = createApp();

    app.listen(config.port, () => {
      logger.info("Contact email server listening", {
        port: config.port,
        env: config.env,
      });
    });
  } catch (error) {
    logger.error("Server failed to start", {
      error: error.message,
    });
    process.exit(1);
  }
}

startServer();
