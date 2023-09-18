import { IsNumber, IsString } from 'class-validator';

export class addPointDto {
  @IsNumber()
  readonly point: number;

  @IsString()
  readonly impUid: string;

  @IsString()
  readonly address: string;
}
