import {
  Matches,
  IsString,
  IsEmail,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

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
  isPersoner: boolean;
}
export default UserDto;
