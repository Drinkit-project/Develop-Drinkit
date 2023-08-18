import { Column, Entity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

import { CommonEntity } from './common.entity';
import { User } from './user.entity';
import { PaymentDetail } from './paymentDetail.entity';

enum PaymentStatus {
  ORDER_PENDING = '주문확인중',
  READY = '상품준비중',
  READY_COMPLETE = '상품준비완료',
  DELIVERY = '배송중',
  PICKUP = '픽업중',
  COMPLETE = '완료',
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

  @ManyToOne(() => User, (user) => user.paymentLog)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;

  @OneToOne(() => PaymentDetail, (paymentDetail) => paymentDetail.paymentLog)
  paymentDetail: PaymentDetail;
}
