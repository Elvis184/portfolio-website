import { Router } from "express";
import { processContactSubmission } from "../handlers/processContactSubmission.js";

const router = Router();

router.post("/", async (request, response) => {
  const result = await processContactSubmission({
    body: request.body,
    ip: request.ip,
  });

  if (result.headers) {
    Object.entries(result.headers).forEach(([name, value]) => {
      response.setHeader(name, value);
    });
  }

  return response.status(result.status).json(result.payload);
});

export default router;
