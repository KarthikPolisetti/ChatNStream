import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createScheduledMessage, getMyScheduledMessages } from "../controllers/scheduled.controller.js";
const router = express.Router();

router.use(protectRoute);

router.post("/", createScheduledMessage);
router.get("/", getMyScheduledMessages);

export default router;