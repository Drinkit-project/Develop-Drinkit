import {
  IsBoolean,
  IsEmail,
  IsJSON,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class createUserDto {
  @IsJSON()
  address: JSON;

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

export default createUserDto;
