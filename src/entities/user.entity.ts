import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { CommonEntity } from './common.entity';
import { PaymentLog } from './paymentLog.entity';
import { Review } from './review.entity';
import { Store } from './store.entity';
import { Subscribe } from './subscribe.entity';
import { Profile } from './profile.entity';

@Entity({ schema: '', name: 'user' })
export class User extends CommonEntity {
  @Column('boolean')
  isAdmin: boolean;

  @Column('varchar')
  email: string;

  @Column('boolean')
  isPersoner: boolean;

  @Column('bigint')
  point: number;

  @Column('varchar')
  password: string;

  @OneToMany(() => PaymentLog, (paymentLog) => paymentLog.user)
  paymentLog: PaymentLog[];

  @OneToOne(() => Store, (store) => store.user)
  store: Store;

  @OneToOne(() => Subscribe, (subscribe) => subscribe.user)
  subscribe: Subscribe;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @OneToMany(() => Review, (review) => review.user)
  review: Review[];
}
