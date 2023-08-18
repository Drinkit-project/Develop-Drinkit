import { Matches, IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class SigninUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/(?!.*\s).{8,}/, {
    message: '비밀번호는 8자리 이상, 공백없이 입력해주세요.',
  })
  password: string;
}
export default SigninUserDto;
