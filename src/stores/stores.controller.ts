import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StoresService } from './stores.service';
import {
  AdminUser,
  CurrentUser,
  PersonalUser,
} from 'src/commons/decorators/user.decorators';
import { AuthGuard } from 'src/auth/security/jwt.guard';
import { User } from 'src/entities/user.entity';

@ApiTags('Store')
@Controller('stores')
export class StoresController {
  constructor(private readonly storeService: StoresService) {}

  @ApiOperation({
    summary: 'Get Store detail by storeId',
    parameters: [{ name: 'storeId', in: 'path' }],
  })
  @Get('/:storeId')
  getStoreDetail(@Param('storeId', ParseIntPipe) id: number) {
    console.log(id);

    return;
  }

  @ApiOperation({
    summary: 'Create Store',
  })
  @UseGuards(AuthGuard)
  @Post()
  createStore(@PersonalUser() isPersonal: boolean) {
    console.log(isPersonal);

    return;
  }

  @ApiOperation({
    summary: 'Update Store detail by storeId',
    parameters: [{ name: 'storeId', in: 'path' }],
  })
  @UseGuards(AuthGuard)
  @Patch('/:storeId')
  updateStroe(
    @Param('storeId', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    console.log(user);
    return;
  }

  @ApiOperation({
    summary: 'Delete Store by storeId',
    parameters: [{ name: 'storeId', in: 'path' }],
  })
  @UseGuards(AuthGuard)
  @Delete('/:storeId')
  deleteStore(
    @Param('storeId', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    console.log(user);
    return;
  }
}
