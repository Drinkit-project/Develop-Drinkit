import {
  Matches,
  IsString,
  IsEmail,
  IsBoolean,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
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

  @IsNumber()
  @IsNotEmpty()
  point: number;
}
export default CreateUserDto;
