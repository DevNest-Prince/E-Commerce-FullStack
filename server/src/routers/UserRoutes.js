import express from "express";
import usercontroller from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMidleware.js";

const router = express.Router();

router.get('/profile', authMiddleware, usercontroller.getUserProfileByJwt);

export default router;
