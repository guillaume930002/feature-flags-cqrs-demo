import { Exclude, Expose } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class Users {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ name: 'role_id' })
  roleId: number;

  @Expose()
  @Column({ unique: true })
  username: string;

  @Exclude()
  password: string;

  @Expose()
  @Column({ name: 'hashed_password' })
  hashedPassword: string;

  @Expose()
  @Column()
  salt: string;

  @Expose()
  @Column()
  email: string;

  @Expose()
  @Column()
  phone: string;

  @Expose()
  @Column()
  status: string;

  @Expose()
  @CreateDateColumn({
    type: 'timestamp without time zone',
    name: 'created_at'
  })
  createdAt: string;

  @Expose()
  @UpdateDateColumn({
    type: 'timestamp without time zone',
    name: 'updated_at'
  })
  updatedAt: string;
}
