import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StoresService } from './stores.service';
import { PersonalUser } from 'src/commons/decorators/user.decorators';
import { AuthGuard } from 'src/auth/security/jwt.guard';
import { User } from 'src/entities/user.entity';
import { CreateStoreDTO } from './DTO/create.DTO';
import { UpdateStoreDTO } from './DTO/update.DTO';

@ApiTags('Store')
@Controller('stores')
export class StoresController {
  constructor(private readonly storeService: StoresService) {}

  @ApiOperation({
    summary: 'Get Store detail by storeId',
    parameters: [{ name: 'storeId', in: 'path' }],
  })
  @Get('/:storeId')
  async getStoreDetail(@Param('storeId', ParseIntPipe) id: number) {
    try {
      const result = await this.storeService.getStoreDetail(id);
      return result;
    } catch (e) {
      throw new NotFoundException('There is no Store in DB');
    }
  }

  @ApiOperation({
    summary: 'Create Store',
  })
  @ApiResponse({
    status: 201,
    description: 'created',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @HttpCode(201)
  @UseGuards(AuthGuard)
  @Post()
  async createStore(@PersonalUser() user: User, @Body() body: CreateStoreDTO) {
    try {
      const result = await this.storeService.createStore(body, user.id);
      return result;
    } catch (e) {
      throw new BadRequestException('error => ' + e.message);
    }
  }

  @ApiOperation({
    summary: 'Update Store detail by storeId',
    parameters: [{ name: 'storeId', in: 'path' }],
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @UseGuards(AuthGuard)
  @Patch('/:storeId')
  async updateStroe(
    @Param('storeId', ParseIntPipe) id: number,
    @PersonalUser() user: User,
    @Body() body: UpdateStoreDTO,
  ) {
    try {
      const result = await this.storeService.updateStore(id, user, body);
      return result;
    } catch (e) {
      throw new BadRequestException('Please try again..');
    }
  }

  @ApiOperation({
    summary: 'Delete Store by storeId',
    parameters: [{ name: 'storeId', in: 'path' }],
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @UseGuards(AuthGuard)
  @Delete('/:storeId')
  deleteStore(
    @Param('storeId', ParseIntPipe) id: number,
    @PersonalUser() user: User,
  ) {
    try {
      const result = this.storeService.deleteStore(id, user);
    } catch (e) {
      throw new BadRequestException('Please try again..');
    }
  }
}
