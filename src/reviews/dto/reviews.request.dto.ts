import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Review } from 'src/entities/review.entity';

export class CreateReviewsRequestDto extends PickType(Review, [
  'content',
  'rating',
]) {}

export class UpdateReviewsRequestDto {
  @IsString()
  @ApiProperty({
    example: '개나이잉이이이이스요',
    description: '리뷰 내용',
    required: true,
  })
  content: string;

  @IsNumber()
  @ApiProperty({
    example: '5',
    description: '리뷰 평점',
    required: true,
  })
  rating: number;
}
