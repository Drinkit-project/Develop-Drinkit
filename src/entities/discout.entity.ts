import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { CommonEntity } from './common.entity';
import { Product } from './product.entity';

@Entity({ schema: '', name: 'discount' })
export class Discount extends CommonEntity {
  @Column('bigint')
  discountPirce: number;

  @Column('int')
  discountRating: number;

  @Column('varchar')
  startDate: Date;

  @Column('bigint')
  productId: number;

  @OneToOne(() => Product, (product) => product.discount)
  @JoinColumn([{ name: 'productId', referencedColumnName: 'id' }])
  product: Product;
}
