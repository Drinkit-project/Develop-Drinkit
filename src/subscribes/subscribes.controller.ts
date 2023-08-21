import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SubscribesService } from './subscribes.service';
import { SubscribesReqDto } from './dto/subscribes.request.dto';
import { AuthGuard } from 'src/auth/security/jwt.guard';
import { CurrentUser } from 'src/commons/decorators/user.decorators';

@ApiTags('subscribes')
@UseGuards(AuthGuard)
@Controller('subscribes')
export class SubscribesController {
  constructor(private subscribesService: SubscribesService) {}

  @ApiOperation({ summary: '구독 하기' })
  @Post()
  async postSubscribe(
    @CurrentUser() userId: number,
    @Body() dto: SubscribesReqDto,
  ) {
    const postSubscribeData = await this.subscribesService.postSubscribe(
      userId,
      dto.isPaid,
    );

    return postSubscribeData;
  }

  @ApiOperation({ summary: '구독 상태확인' })
  @Get()
  async getSubscribe(@CurrentUser() userId: number) {
    const getSubscribeData = await this.subscribesService.getSubscribe(userId);

    return getSubscribeData;
  }

  @ApiOperation({ summary: '구독 상태변경' })
  @Put()
  async updateSubscribe(@CurrentUser() userId: number) {
    const postSubscribeData = await this.subscribesService.updateSubscribe(
      userId,
    );

    return postSubscribeData;
  }

  @ApiOperation({ summary: '구독 취소' })
  @Delete()
  async deleteSubscribe(@CurrentUser() userId: number) {
    const deleteSubscribeData = await this.subscribesService.deleteSubscribe(
      userId,
    );

    return deleteSubscribeData;
  }
}
