import { IsNotEmpty, IsString, Matches, isJSON } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  address: JSON;

  @IsString()
  @IsNotEmpty()
  confirm: string;
}

export default UpdateUserDto;
