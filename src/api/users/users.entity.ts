import {
  BaseEntity,
  Entity,
  Unique,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity()
@Unique(['email', 'id'])
export class User extends BaseEntity {
  @PrimaryColumn({ unique: true, type: 'bigint' })
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  username: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
