import { Column, Entity, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { PickType } from '@nestjs/swagger';

import { User } from './user.entity';
import { CommonEntity } from './common.entity';

@Entity({ schema: '', name: 'profile' })
export class Profile extends PickType(CommonEntity, [
  'createdAt',
  'updatedAt',
]) {
  @PrimaryColumn({ type: 'bigint', name: 'userId' })
  userId: number;

  @Column('varchar')
  address: string;

  @Column('varchar')
  phoneNumber: string;

  @Column('varchar')
  nickname: string;

  @Column('varchar')
  name: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;
}
