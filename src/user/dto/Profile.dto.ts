import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsPhoneNumber,
} from 'class-validator';
import AddressDto from './address.dto';
import { Type } from 'class-transformer';

export class ProfileDto {
  @ValidateNested() // 중첩된 객체에 대한 유효성 검사
  @Type(() => AddressDto) // 클래스를 타입으로 변환
  address: AddressDto;

  @IsPhoneNumber('KR')
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export default ProfileDto;
