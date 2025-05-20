import Router from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/signUp", authController.signUp);
router.post("/signIn", authController.signIn);
router.post("/signOut", authMiddleware.reqAuth, authController.signOut);
router.get("/auth/session", authMiddleware.reqAuth, authController.session);

export const authRouter = router;
