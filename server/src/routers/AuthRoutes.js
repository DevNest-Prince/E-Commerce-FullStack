import express from "express";
const router=express.Router();
import authController from "../controllers/authController.js";

router.post('/send/login-signup-otp', authController.sendLoginOtp);

router.post('/signup', authController.createUser);

router.post('/signin', authController.sigin);

export default router;