import { User } from "@supabase/supabase-js";
import { Request, Response } from "express";

import { vaultService } from "../services/vault.service";
export interface AuthRequest extends Request {
  user?: User | null;
}

class VaultController {
  public async createVault(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const { title, message, availableAt } = req.body;
      const newVault = await vaultService.createVault(
        title,
        message,
        availableAt,
        userId,
      );
      res.status(201).json(newVault);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }

  public async getVaults(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const vaults = await vaultService.getAvailableVaults(userId);
      res.json(vaults);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  public async deleteVault(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const { id } = req.params;
      await vaultService.deleteVault(id, userId);
      res.sendStatus(204);
    } catch (err) {
      res.status(404).json({ error: (err as Error).message });
    }
  }
}

export const vaultController = new VaultController();
