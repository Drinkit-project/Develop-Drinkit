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
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ schema: '', name: 'product' })
export class Product extends CommonEntity {
  @IsNumber()
  @ApiProperty({
    example: '30000',
    description: '상품 가격',
    required: true,
  })
  @Column('bigint')
  price: number;

  @IsString()
  @ApiProperty({
    example: '두혁위스키',
    description: '상품 이름',
    required: true,
  })
  @Column('varchar')
  productName: string;

  @IsNumber()
  @ApiProperty({
    example: '2',
    description: 'categoryId',
    required: true,
  })
  @Column('bigint')
  categoryId: number;

  @IsNumber()
  @ApiProperty({
    example: '200',
    description: '상품 재고',
    required: true,
  })
  @Column('bigint')
  totalStock: number;

  @IsString()
  @ApiProperty({
    example: '이거는 술이야 술술 들어가는 술이야',
    description: '상품 설명',
    required: true,
  })
  @Column('varchar')
  description: string;

  @IsString()
  @ApiProperty({
    example: 'url',
    description: '상품 이미지',
    required: true,
  })
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
