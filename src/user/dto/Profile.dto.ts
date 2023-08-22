import { IsJSON, IsNotEmpty, IsString } from 'class-validator';

export class ProfileDto {
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
}

export default ProfileDto;
