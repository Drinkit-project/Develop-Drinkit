import { OneToMany, Column, Entity } from 'typeorm';

import { CommonEntity } from './common.entity';
import { Product } from './product.entity';

@Entity({ schema: '', name: 'category' })
export class Category extends CommonEntity {
  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
  })
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  product: Product[];
}
