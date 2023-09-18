import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/security/jwt.guard';
import { CurrentUser } from 'src/commons/decorators/user.decorators';
import {
  CreateReviewsRequestDto,
  UpdateReviewsRequestDto,
} from './dto/reviews.request.dto';
import { ReviewsService } from './reviews.service';
import UserDto from 'src/user/dto/user.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @ApiOperation({ summary: '상품 리뷰내역 조회' })
  @Get('')
  async getReviewByProductId(@Query() query) {
    const { productId } = query;
    let reviews = [];

    reviews = await this.reviewsService.getByProductId(productId);

    return reviews;
  }

  @ApiOperation({ summary: '리뷰 등록' })
  @UseGuards(AuthGuard)
  @Post()
  async createReview(
    @CurrentUser() user,
    @Query() query: any,
    @Body() body: CreateReviewsRequestDto,
  ) {
    const { paymentDetailId } = query;
    const { content, rating } = body;

    const newProduct = await this.reviewsService.createReview(
      user.id,
      paymentDetailId,
      content,
      rating,
    );

    return '리뷰 등록 완료!';
  }

  @ApiOperation({ summary: '리뷰 수정' })
  @UseGuards(AuthGuard)
  @Put(':reviewId')
  async updateReview(
    @CurrentUser() user,
    @Param() param: any,
    @Body() body: UpdateReviewsRequestDto,
  ) {
    const { reviewId } = param;
    const { content, rating } = body;

    const newProduct = await this.reviewsService.updateReview(
      user.id,
      reviewId,
      content,
      rating,
    );

    return '리뷰 수정 완료!';
  }

  @ApiOperation({ summary: '리뷰 삭제' })
  @UseGuards(AuthGuard)
  @Delete(':reviewId')
  async removeReview(@CurrentUser() user, @Param() param: any) {
    const { reviewId } = param;

    const newProduct = await this.reviewsService.removeReview(
      user.id,
      reviewId,
    );

    return '리뷰 삭제 완료!';
  }
}
