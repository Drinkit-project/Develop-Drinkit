import { Column, Entity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

import { CommonEntity } from './common.entity';
import { User } from './user.entity';
import { PaymentDetail } from './paymentDetail.entity';

enum PaymentStatus {
  READY = '준비 중',
  DELIVERY = '배송 중',
  COMPLETE = '배송 완료',
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
