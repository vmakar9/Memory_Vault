import { LessThanOrEqual, Repository } from "typeorm";

import { Vault } from "../models/messages.model";
import { AppDataSource } from "../ormconfig";

export class VaultService {
  private repo: Repository<Vault>;

  constructor() {
    this.repo = AppDataSource.getRepository(Vault);
  }

  public async createVault(
    title: string,
    message: string,
    availableAtStr: string,
    userId: string,
  ): Promise<Vault> {
    const vault = this.repo.create({
      title,
      message,
      user_id: userId,
      availableAt: new Date(availableAtStr),
    });
    return await this.repo.save(vault);
  }

  public async getAvailableVaults(userId: string): Promise<Vault[]> {
    const now = new Date();
    return await this.repo.find({
      where: {
        user_id: userId,
        availableAt: LessThanOrEqual(now),
      },
      order: { availableAt: "ASC" },
    });
  }

  public async deleteVault(id: string, userId: string): Promise<void> {
    const vault = await this.repo.findOneBy({ id, user_id: userId });
    if (!vault) {
      throw new Error("Capsule not found or unauthorized");
    }
    await this.repo.delete({ id, user_id: userId });
  }
}

export const vaultService = new VaultService();
