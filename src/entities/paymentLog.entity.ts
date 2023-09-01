import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { CommonEntity } from './common.entity';
import { User } from './user.entity';
import { PaymentDetail } from './paymentDetail.entity';

export enum PaymentStatus {
  ORDER_PENDING = '주문확인중',
  READY = '상품준비중',
  READY_COMPLETE = '상품준비완료',
  DELIVERY = '배송중',
  PICKUP = '픽업중',
  COMPLETE = '완료',
  WAIT_CANCELL = '취소대기',
  CANCELLED = '취소',
}

@Entity({ schema: '', name: 'paymentLog' })
export class PaymentLog extends CommonEntity {
  @Column('bigint')
  userId: number;

  @Column({ type: 'enum', enum: PaymentStatus })
  status: string;

  @Column('bigint')
  totalPrice: number;

  @Column('bigint')
  storeId: number;

  @Column('bigint')
  paidPoint: number;

  @Column('varchar')
  impUid: string;

  @Column('varchar')
  address: string;

  @ManyToOne(() => User, (user) => user.paymentLog)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(() => PaymentDetail, (paymentDetail) => paymentDetail.paymentLog)
  paymentDetail: PaymentDetail[];
}
