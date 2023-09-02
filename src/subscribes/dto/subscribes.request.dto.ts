import { IsBoolean, IsString } from 'class-validator';

export class SubscribesReqDto {
  @IsBoolean()
  readonly isPaid: boolean;

  @IsString()
  readonly address: string;
}
