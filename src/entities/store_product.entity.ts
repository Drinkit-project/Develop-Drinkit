import { Column, ManyToOne, Entity, JoinColumn } from 'typeorm';
import { Store } from 'src/entities/store.entity';
import { Product } from 'src/entities/product.entity';
import { CommonEntity } from './common.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ schema: '', name: 'store_product' })
export class Store_Product extends CommonEntity {
  @ApiProperty({
    example: 1,
    name: 'storeId',
    description: 'ID of store',
  })
  @Column({
    type: 'integer',
  })
  storeId: number;

  @ApiProperty({
    example: 2,
    name: 'productId',
    description: 'ID of product',
  })
  @Column({
    type: 'integer',
  })
  productId: number;

  @ApiProperty({
    example: 30,
    name: 'storeStock',
    description: 'Stock of product on store',
  })
  @Column({
    type: 'integer',
  })
  storeStock: number;

  @ManyToOne(() => Store, (store) => store.productList)
  @JoinColumn([{ name: 'storeId', referencedColumnName: 'id' }])
  store: Store;

  @ManyToOne(() => Product, (product) => product.store_product)
  @JoinColumn([{ name: 'productId', referencedColumnName: 'id' }])
  product: Product;
}
