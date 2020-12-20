import { BaseEntity, Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class ContactDetail extends BaseEntity {
  @Column()
  phone: string;

  @Column()
  email: string;

  @OneToOne(() => User, (user) => user.id, { primary: true })
  @JoinColumn()
  user: User;
}
