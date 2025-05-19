import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "vault" })
export class Vault {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  user_id: string;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column({ type: "timestamp" })
  availableAt: Date;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}
