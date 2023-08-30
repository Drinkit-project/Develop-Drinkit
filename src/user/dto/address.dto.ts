import { IsNotEmpty, IsString } from 'class-validator';

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  lat: number;

  @IsNotEmpty()
  lng: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export default AddressDto;
