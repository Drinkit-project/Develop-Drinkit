import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Res,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from '../entities/user.entity';
import { AuthGuard } from './jwt/jwt.guard';
import { Response, Request } from 'express';
import { CurrentUser } from 'src/commons/decorators/user.decorators';

@ApiTags('users')
@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'sign-up' })
  @Post('/signUp')
  async signUp(@Body() data: UserDto) {
    return await this.authService.signUp(data);
  }

  @ApiOperation({ summary: 'sign-in' })
  @Post('/signIn')
  async signIn(@Body() data: Partial<UserDto>, @Res() response: Response) {
    const jwt = await this.authService.signIn(data);
    response.cookie('Authentication', 'Bearer ' + jwt);
    return response.json(jwt);
  }

  @ApiOperation({ summary: 'sign-out' })
  @UseGuards(AuthGuard)
  @Delete('/signOut')
  async signout(@Res() response: Response, @CurrentUser() user: User) {
    // await this.authService.signOut(user.id);
    return response.status(200).send('signed out successfully');
  }

  @ApiOperation({ summary: 'update user' })
  @UseGuards(AuthGuard)
  @Patch()
  async updateUserPassword(
    @CurrentUser() userId: number,
    @Body() data: UpdateUserDto,
  ) {
    return await this.authService.updateUserPassword(userId, data);
  }

  @ApiOperation({ summary: 'delete user' })
  @UseGuards(AuthGuard)
  @Delete()
  async deleteUser(@CurrentUser() user: User) {
    return await this.authService.deleteUser(user.id);
  }

  @ApiOperation({ summary: 'get user' })
  @UseGuards(AuthGuard)
  @Get('/authenticate')
  async getUser(@CurrentUser() user: User, @Body() data: Partial<UserDto>) {
    const userchecked = await this.authService.authenticationByPassword(
      user.id,
      data.password,
    );
    return userchecked;
  }
}
