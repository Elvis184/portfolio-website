const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

function shouldLog(currentLevel, messageLevel) {
  return levels[messageLevel] <= levels[currentLevel];
}

function write(level, message, meta = {}) {
  const logLevel = process.env.LOG_LEVEL || "info";

  if (!shouldLog(logLevel, level)) {
    return;
  }

  const payload = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...meta,
  };

  const output = JSON.stringify(payload);

  if (level === "error") {
    console.error(output);
    return;
  }

  console.log(output);
}

export const logger = {
  error: (message, meta) => write("error", message, meta),
  warn: (message, meta) => write("warn", message, meta),
  info: (message, meta) => write("info", message, meta),
  debug: (message, meta) => write("debug", message, meta),
};
