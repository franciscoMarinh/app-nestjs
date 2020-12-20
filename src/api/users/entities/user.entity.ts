import { BaseEntity, Entity, Column, PrimaryColumn, OneToOne } from 'typeorm';
import { ContactDetail } from './contactDetail.entity';
import { AddressData } from './addressData.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  website: string;

  @OneToOne(() => AddressData, (addressData) => addressData.user) // specify inverse side as a second parameter
  addressData: AddressData;

  @OneToOne(() => ContactDetail, (addressData) => addressData.user) // specify inverse side as a second parameter
  contactDetail: ContactDetail;
}
