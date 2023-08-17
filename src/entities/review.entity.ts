import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CommonEntity } from './common.entity';
import { User } from './user.entity';
import { Product } from './product.entity';

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

  @Column('varchar')
  content: string;

  @Column({ type: 'enum', enum: ReviewRating })
  status: number;

  @Column('bigint')
  userId: number;

  @ManyToOne(() => Product, (product) => product.review)
  @JoinColumn([{ name: 'productId', referencedColumnName: 'id' }])
  product: Product;

  @ManyToOne(() => User, (user) => user.review)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;
}
