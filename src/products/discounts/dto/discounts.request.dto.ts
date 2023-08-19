import { OmitType } from '@nestjs/swagger';
import { Discount } from 'src/entities/discout.entity';

export class CreateDiscountRequestDto extends OmitType(Discount, [
  'discountPrice',
  'discountRating',
  'startDate',
  'endDate',
]) {}
