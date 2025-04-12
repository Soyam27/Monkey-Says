import express from 'express';
import { profileAuth } from '../middleware/auth.middleware.js';
import { getMessages, getUserForSidebar, sendMessage } from '../controllers/message.controller.js';

const router = express.Router();

router.get("/user",profileAuth,getUserForSidebar);
router.get("/:id",profileAuth,getMessages);
router.post("/send/:id",profileAuth,sendMessage);

export default router;