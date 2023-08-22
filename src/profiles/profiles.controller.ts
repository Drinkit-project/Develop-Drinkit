import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
// import { AuthGuard } from '../auth/security/jwt.guard';
// import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { CurrentUser } from 'src/commons/decorators/user.decorators';
// // import {CreateProfileDto} from './dto/createProfile.dto'

// @ApiTags()
@Controller('profiles')
export class ProfilesController {
  //   @Get() // 프로필 조회
  //   @ApiOperation({ summary: 'Get profile' })
  //   @ApiResponse({ status: 200, description: 'OK' })
  //   @ApiResponse({ status: 404, description: 'Not Found' })
  //   getCartByUserId(@Query('id', ParseIntPipe) id: number) {}
  //   @Post()
  //   @ApiOperation({ summary: 'create profile' })
  //   @UseGuards(AuthGuard)
  //   addItemOnCart(
  //     @CurrentUser() userId: number,
  //     // @Body() body: CreateProfileDto,,
  //   ) {}
  //   @Post()
  //   addCartOnRedis(@Query('id', ParseIntPipe) id: number) {}
  //   @Put()
  //   updateItemOnCart(
  //     @Query('id', ParseIntPipe) id: number,
  //     @Query('productId', ParseIntPipe) productId: number,
  //     // @Body() body: UpdateItemDTO,
  //   ) {}
}
