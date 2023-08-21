import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/(?!.*\s).{8,}/, {
    message: '비밀번호는 8자리 이상, 공백없이 입력해주세요.',
  })
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  confirm: string;
}

export default UpdateUserDto;
