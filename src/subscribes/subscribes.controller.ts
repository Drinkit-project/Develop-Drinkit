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
    const postSubscribeData = await this.subscribesService.postSubscribe(
      dto.isPaid,
    );

    return postSubscribeData;
  }

  @ApiOperation({ summary: '구독 취소' })
  @Delete()
  async deleteSubscribe(@Param('subscribeId') subscribeId: number) {
    const deleteSubscribeData = await this.subscribesService.deleteSubscribe(
      subscribeId,
    );

    return deleteSubscribeData;
  }
}
