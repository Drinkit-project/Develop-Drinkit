import { Column, Entity, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { CommonEntity } from './common.entity';
import { PickType } from '@nestjs/swagger';

@Entity({ schema: '', name: 'subscribe' })
export class Subscribe extends PickType(CommonEntity, [
  'createdAt',
  'updatedAt',
]) {
  @PrimaryColumn({ type: 'bigint', name: 'userId' })
  userId: number;

  @Column('boolean')
  isPaid: boolean;

  @Column('varchar')
  address: string;

  @OneToOne(() => User, (user) => user.subscribe)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;
}
