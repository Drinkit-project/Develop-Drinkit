import { Column, Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Store_Product } from 'src/entities/store_product.entity';
import { CommonEntity } from './common.entity';
import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ schema: '', name: 'store' })
export class Store extends CommonEntity {
  @ApiProperty({
    example: '서울 강남구 역삼로 123-45, 드링킷 Corp',
    name: 'address',
    description: 'Address where it is.',
    required: true,
  })
  @IsNotEmpty()
  @Column('varchar')
  address: string;

  @ApiProperty({
    example: 'Drink!t Store 1호점',
    name: 'name',
    description: 'Store name what it is.',
    required: true,
  })
  @IsNotEmpty()
  @Column('varchar')
  name: string;

  @ApiProperty({
    example: '드링킷 1호점입니다. 방문시 다양한 주류를 확인하실 수 있습니다.',
    name: 'description',
    description: 'Description for store',
    required: true,
  })
  @IsNotEmpty()
  @Column('varchar')
  description: string;

  @ApiProperty({
    example: '123-98-45678',
    name: 'businessLicense',
    description: '사업자 등록증 번호',
    required: true,
  })
  @IsNotEmpty()
  @Column({
    type: 'varchar',
    length: 12,
  })
  businessLicense: string;

  @ApiProperty({
    name: 'imgUrls',
    description: '매장 사진',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  @Column({
    type: 'varchar',
    length: 65535,
    default: '[]',
  })
  imgUrls: string;

  @ApiProperty({
    name: 'userId',
    description: '매장 점주 ID',
    required: true,
  })
  @Column({
    type: 'integer',
    unique: true,
  })
  userId: number;

  @OneToOne(() => User, (user) => user.store)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(() => Store_Product, (store_product) => store_product.store)
  productList: Store_Product[];
}
