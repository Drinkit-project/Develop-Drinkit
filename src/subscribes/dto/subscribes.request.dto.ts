import { IsBoolean } from 'class-validator';

export class SubscribesReqDto {
  @IsBoolean()
  readonly isPaid: boolean;
}
