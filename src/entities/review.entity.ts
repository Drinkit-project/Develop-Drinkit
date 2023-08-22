import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { CommonEntity } from './common.entity';
import { User } from './user.entity';
import { Product } from './product.entity';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentDetail } from './paymentDetail.entity';

enum ReviewRating {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

@Entity({ schema: '', name: 'review' })
export class Review extends CommonEntity {
  @Column('bigint')
  productId: number;

  @IsString()
  @ApiProperty({
    example: '개나이잉이이이이스요',
    description: '리뷰 내용',
    required: true,
  })
  @Column('varchar')
  content: string;

  @IsNumber()
  @ApiProperty({
    example: '5',
    description: '리뷰 평점',
    required: true,
  })
  @Column({ type: 'int', enum: ReviewRating })
  rating: number;

  @Column('bigint')
  userId: number;

  @Column('bigint')
  paymentDetailId: number;

  @ManyToOne(() => Product, (product) => product.review)
  @JoinColumn([{ name: 'productId', referencedColumnName: 'id' }])
  product: Product;

  @ManyToOne(() => User, (user) => user.review)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;

  @OneToOne(() => PaymentDetail, (paymentDetail) => paymentDetail.review)
  @JoinColumn([{ name: 'paymentDetailId', referencedColumnName: 'id' }])
  paymentDetail: PaymentDetail;
}
