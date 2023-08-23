import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Store } from 'src/entities/store.entity';

export class UpdateStoreDTO extends OmitType(Store, ['id', 'businessLicense']) {
  @IsOptional()
  @ApiProperty({
    example: '서울 강남구 역삼로 123-45, 드링킷 Corp',
    name: 'address',
    description: 'Address where it is.',
    required: false,
  })
  address: string;

  @IsOptional()
  @ApiProperty({
    example: 'Drink!t Store 1호점',
    name: 'name',
    description: 'Store name what it is.',
    required: false,
  })
  name: string;

  @IsOptional()
  @ApiProperty({
    example: '드링킷 1호점입니다. 방문시 다양한 주류를 확인하실 수 있습니다.',
    name: 'description',
    description: 'Description for store',
    required: false,
  })
  description: string;

  @IsOptional()
  @ApiProperty({
    name: 'userId',
    description: '매장 점주 ID',
    required: false,
  })
  userId: number;
}
