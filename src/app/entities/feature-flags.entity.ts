import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('feature_flags')
export class FeatureFlags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'account_id' })
  accountId: number;

  @Column({ unique: true })
  name: string;

  @Column({ name: 'is_enabled' })
  isEnabled: boolean;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    name: 'created_at'
  })
  createdAt: string;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    name: 'updated_at'
  })
  updatedAt: string;
}
