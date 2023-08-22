import { Column, ManyToOne, Entity, JoinColumn } from 'typeorm';
import { Store } from 'src/entities/store.entity';
import { Product } from 'src/entities/product.entity';
import { CommonEntity } from './common.entity';

@Entity({ schema: '', name: 'store_product' })
export class Store_Product extends CommonEntity {
  @Column('bigint')
  storeId: number;

  @Column('bigint')
  productId: number;

  @Column('bigint')
  totalStock: number;

  @ManyToOne(() => Store, (store) => store.store_product)
  @JoinColumn([{ name: 'storeId', referencedColumnName: 'id' }])
  store: Store;

  @ManyToOne(() => Product, (product) => product.store_product)
  @JoinColumn([{ name: 'productId', referencedColumnName: 'id' }])
  product: Product;
}
