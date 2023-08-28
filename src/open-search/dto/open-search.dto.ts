import { IsString } from 'class-validator';

export class OpenSearchDto {
  @IsString()
  readonly keyword: string;
}
