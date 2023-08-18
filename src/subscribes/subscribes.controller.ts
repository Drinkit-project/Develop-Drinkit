import { Controller, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { SubscribesService } from './subscribes.service';
import { SubscribesReqDto } from './dto/subscribes.request.dto';

@Controller('subscribes')
export class SubscribesController {
  constructor(private subscribesService: SubscribesService) {}

  @ApiOperation({ summary: '구독 하기' })
  @Post()
  async postSubscribe(@Body() dto: SubscribesReqDto) {
    const userId = 1; //Todo: (인증 부분 확인 후 추가)
    const postSubscribeData = await this.subscribesService.postSubscribe(
      userId,
      dto.isPaid,
    );

    return postSubscribeData;
  }

  @ApiOperation({ summary: '구독 취소' })
  @Delete(':subscribesId')
  async deleteSubscribe(@Param('subscribesId') subscribeId: number) {
    const deleteSubscribeData = await this.subscribesService.deleteSubscribe(
      subscribeId,
    );

    return deleteSubscribeData;
  }
}
