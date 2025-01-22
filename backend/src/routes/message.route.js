import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getUsersForSidebar,
  getMessages,
  sendMessage,
  getGroupsForSidebar,
  getGroupMessages,
  sendGroupMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/groups", protectRoute, getGroupsForSidebar);

router.get("/group/:id", protectRoute, getGroupMessages);
router.post("/sendgroup/:id", protectRoute, sendGroupMessage);

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
