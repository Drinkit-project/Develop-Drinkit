import { IsNotEmpty, IsString } from 'class-validator';

export class ProfileDto {
  address: { address: string; name: string };

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
