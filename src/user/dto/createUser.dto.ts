import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import AddressDto from './address.dto';

export class CreateUserDto {
  @ValidateNested() // 중첩된 객체에 대한 유효성 검사
  @Type(() => AddressDto) // 클래스를 타입으로 변환
  address: AddressDto;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/(?!.*\s).{8,}/, {
    message: '비밀번호는 8자리 이상, 공백없이 입력해주세요.',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  confirm: string;

  @IsBoolean()
  @IsNotEmpty()
  isAdmin: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isPersonal: boolean;
}

export default CreateUserDto;
