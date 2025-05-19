import { NextFunction, Response } from "express";

import { AuthRequest } from "../controllers/vault.controller";
import { supabase } from "../utils/supabase";
class AuthMiddleware {
  public async reqAuth(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const token =
        req.cookies?.access_token || req.headers.authorization?.split(" ")[1];

      if (!token) {
        res.status(401).json({ error: "Authorization token required" });
        return;
      }
      const { data, error } = await supabase.auth.getUser(token);
      if (error || !data.user) {
        res.status(401).json({ error: "Invalid or expired token" });
      }
      req.user = data.user;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
