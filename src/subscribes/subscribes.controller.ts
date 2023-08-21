import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SubscribesService } from './subscribes.service';
import { SubscribesReqDto } from './dto/subscribes.request.dto';

@ApiTags('subscribes')
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

  @ApiOperation({ summary: '구독 상태확인' })
  @Get()
  async getSubscribe() {
    const userId = 1; //Todo: (인증 부분 확인 후 추가)
    const getSubscribeData = await this.subscribesService.getSubscribe(userId);

    return getSubscribeData;
  }

  @ApiOperation({ summary: '구독 상태변경' })
  @Put()
  async updateSubscribe() {
    const userId = 1; //Todo: (인증 부분 확인 후 추가)
    const postSubscribeData = await this.subscribesService.updateSubscribe(
      userId,
    );

    return postSubscribeData;
  }

  @ApiOperation({ summary: '구독 취소' })
  @Delete()
  async deleteSubscribe() {
    const userId = 1; //Todo: (인증 부분 확인 후 추가)
    const deleteSubscribeData = await this.subscribesService.deleteSubscribe(
      userId,
    );

    return deleteSubscribeData;
  }
}
