import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class ProfileDto {
  @IsArray()
  address: Array<{ address: string; addressName: string }>;

  @IsString()
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
