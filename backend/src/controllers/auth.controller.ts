import { NextFunction, Request, Response } from "express";

import { authService } from "../services/auth.service";
import { AuthRequest } from "./vault.controller";
class AuthController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { user } = await authService.signUp({ email, password });
      res.status(201).json({ user });
    } catch (e) {
      next(e);
    }
  }
  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { session, user } = await authService.signIn({ email, password });

      if (!session) throw new Error("No session returned");

      res
        .cookie("access_token", session.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "development",
          sameSite: "lax",
          maxAge: 1000 * 60 * 60 * 24,
        })
        .status(200)
        .json({ user });
    } catch (e) {
      next(e);
    }
  }

  public async signOut(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.signOut();
      res
        .clearCookie("access_token")
        .status(200)
        .json({ message: "Signed out successfully" });
    } catch (e) {
      next(e);
    }
  }

  public async session(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = req.user;
      if (!user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
      res.json({ user });
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
