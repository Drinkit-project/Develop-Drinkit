import { Column, Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Store_Product } from 'src/entities/store_product.entity';
import { CommonEntity } from './common.entity';

@Entity({ schema: '', name: 'store' })
export class Store extends CommonEntity {
  @Column('varchar')
  adress: string;

  @Column('varchar')
  name: string;

  @Column('bigint')
  userId: bigint;

  @Column('varchar')
  imgUrl: string;

  @OneToOne(() => User, (user) => user.store)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(() => Store_Product, (store_product) => store_product.store)
  store_product: Store_Product[];
}
