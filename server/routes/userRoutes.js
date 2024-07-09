import express from "express";
import { loginUser } from "../controllers/userController.js";

const router = express.Router();

// Login
router.post("/login_user", loginUser);

export default router;
