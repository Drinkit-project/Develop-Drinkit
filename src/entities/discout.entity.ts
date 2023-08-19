import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { CommonEntity } from './common.entity';
import { Product } from './product.entity';
import { IsDate, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ schema: '', name: 'discount' })
export class Discount extends CommonEntity {
  @IsNumber()
  @ApiProperty({
    example: '20000',
    description: '할인 할 가격',
    required: false,
  })
  @Column('bigint')
  discountPrice: number;

  @IsNumber()
  @ApiProperty({
    example: '30',
    description: '할인 할 할인율',
    required: false,
  })
  @Column('int')
  discountRating: number;

  @IsDate()
  @ApiProperty({
    example: '2',
    description: '할인을 시작하는 날',
    required: true,
  })
  @Column('varchar')
  startDate: Date;

  @IsDate()
  @ApiProperty({
    example: '2',
    description: '할인이 끝나는 날',
    required: true,
  })
  @Column('varchar')
  endDate: Date;

  productId: number;

  @OneToOne(() => Product, (product) => product.discount)
  @JoinColumn([{ name: 'productId', referencedColumnName: 'id' }])
  product: Product;
}
