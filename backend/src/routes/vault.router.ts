import { Router } from "express";

import { vaultController } from "../controllers/vault.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const router = Router();

router.post("/vault", authMiddleware.reqAuth, vaultController.createVault);
// Отримання всіх доступних капсул поточного користувача
router.get("/vault", authMiddleware.reqAuth, vaultController.getVaults);
// Видалення капсули за id (тільки для власних капсул)
router.delete(
  "/vault/:id",
  authMiddleware.reqAuth,
  vaultController.deleteVault,
);

export const vaultRouter = router;
