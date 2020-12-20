import { BaseEntity, Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class AddressData extends BaseEntity {
  @Column()
  street: string;

  @Column()
  suite: string;

  @Column()
  city: string;

  @Column()
  zipcode: string;

  @Column()
  geo: string;

  @OneToOne(() => User, (user) => user.id, { primary: true })
  @JoinColumn()
  user: User;
}
