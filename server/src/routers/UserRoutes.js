import express from "express";
<<<<<<< HEAD
const router=express.Router();

=======
import usercontroller from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMidleware.js";

const router = express.Router();

router.get('/profile', authMiddleware, usercontroller.getUserProfileByJwt);

export default router;
>>>>>>> 8ef91de7fa8fb9a043d948fb9fd96377043cacf7
