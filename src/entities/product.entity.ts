import {
  ManyToOne,
  OneToOne,
  OneToMany,
  Column,
  Entity,
  JoinColumn,
} from 'typeorm';
import { Store_Product } from 'src/entities/store_product.entity';
import { PaymentDetail } from 'src/entities/paymentDetail.entity';
import { CommonEntity } from './common.entity';
import { Category } from './category.entity';
import { Review } from './review.entity';
import { Discount } from './discout.entity';

@Entity({ schema: '', name: 'product' })
export class Product extends CommonEntity {
  @Column('bigint')
  price: number;

  @Column('varchar')
  productName: string;

  @Column('bigint')
  categoryId: number;

  @Column('varchar')
  discription: string;

  @Column('varchar')
  imgUrl: string;

  @OneToMany(() => Store_Product, (store_product) => store_product.product)
  store_product: Store_Product[];

  @OneToOne(() => PaymentDetail, (paymentDetail) => paymentDetail.product)
  paymentDetail: PaymentDetail;

  @OneToOne(() => Discount, (discount) => discount.product)
  discount: Discount;

  @ManyToOne(() => Category, (category) => category.product)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @OneToMany(() => Review, (review) => review.product)
  review: Review[];

  // @OneToMany(() => Product, (product) => product.store_product)
  // @JoinColumn([{ name: 'productId', referencedColumnName: 'id' }])
  // product: Product;
}
