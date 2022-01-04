import { v4 as uuid } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn, DeleteDateColumn } from 'typeorm';

@Entity('frequencies')
export default class Frequency {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  default: boolean;

  @Column()
  interval: Date;

  @Column()
  period: string;

  @Column()
  maxSessions: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  constructor() {
    this.id = uuid();
  }
}