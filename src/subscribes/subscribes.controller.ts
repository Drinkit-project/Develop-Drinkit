import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
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
  async postSubscribe(@CurrentUser() user, @Body() dto: SubscribesReqDto) {
    const postSubscribeData = await this.subscribesService.postSubscribe(
      user.id,
      dto.isPaid,
      dto.address,
    );

    return postSubscribeData;
  }

  @ApiOperation({ summary: '구독 상태확인' })
  @Get()
  async getSubscribe(@CurrentUser() user) {
    const getSubscribeData = await this.subscribesService.getSubscribe(user.id);

    return getSubscribeData;
  }

  @ApiOperation({ summary: '구독 상태변경' })
  @Put()
  async updateSubscribe(@CurrentUser() user, @Body() dto: SubscribesReqDto) {
    const postSubscribeData = await this.subscribesService.updateSubscribe(
      user.id,
      dto.isPaid,
      dto.address,
    );

    return postSubscribeData;
  }

  @ApiOperation({ summary: '구독 취소' })
  @Delete()
  async deleteSubscribe(@CurrentUser() user) {
    const deleteSubscribeData = await this.subscribesService.deleteSubscribe(
      user.id,
    );

    return deleteSubscribeData;
  }
}
