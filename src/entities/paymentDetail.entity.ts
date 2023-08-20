import { Column, Entity, OneToOne, ManyToOne, JoinColumn } from 'typeorm';

import { CommonEntity } from './common.entity';
import { Product } from './product.entity';
import { PaymentLog } from './paymentLog.entity';

@Entity({ schema: '', name: 'paymentDetail' })
export class PaymentDetail extends CommonEntity {
  @Column('bigint')
  productId: number;

  @Column('bigint')
  paymentLogId: number;

  @Column('bigint')
  count: number;

  @ManyToOne(() => Product, (product) => product.paymentDetail)
  @JoinColumn([{ name: 'productId', referencedColumnName: 'id' }])
  product: Product;

  @ManyToOne(() => PaymentLog, (paymentLog) => paymentLog.paymentDetail)
  @JoinColumn([{ name: 'paymentLogId', referencedColumnName: 'id' }])
  paymentLog: PaymentLog;
}
