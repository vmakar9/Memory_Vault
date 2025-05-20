import { Router } from "express";

import { vaultController } from "../controllers/vault.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const router = Router();

router.post("/vault", authMiddleware.reqAuth, vaultController.createVault);

router.get("/vault", authMiddleware.reqAuth, vaultController.getVaults);

router.delete(
  "/vault/:id",
  authMiddleware.reqAuth,
  vaultController.deleteVault,
);

export const vaultRouter = router;
