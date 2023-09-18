import { IsString } from 'class-validator';

export default class CreateCategoryDTO {
  @IsString()
  name: string;
}
