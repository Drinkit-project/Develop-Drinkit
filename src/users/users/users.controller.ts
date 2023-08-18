import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Req,
  Res,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { SigninUserDto } from './dto/signinUser.dto';
import { User } from '../../entities/user.entity';
import { JwtAuthGuard } from '../../auth/jwt.guard';
import { Response } from 'express';
import { CurrentUser } from 'src/commons/decorators/user.decorators';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'sign-up' })
  @Post('/signup')
  async createUser(@Body() data: CreateUserDto) {
    return await this.usersService.createUser(data);
  }

  @ApiOperation({ summary: 'sign-in' })
  @Post('/signin')
  async signin(@Body() data: SigninUserDto, @Res() response: Response) {
    const authentication = await this.authService.signin(data);
  }

  @ApiOperation({ summary: 'get user' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getUser(@CurrentUser() user: User) {
    return user;
  }

  @ApiOperation({ summary: 'sign-out' })
  @Delete('/signout')
  async signout(@Res() response: Response) {
    response.clearCookie('Authentication');
    response.status(200).send('signed out successfully');
  }

  @ApiOperation({ summary: 'update user' })
  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateUser(@CurrentUser() user: User, @Body() body: UpdateUserDto) {
    return await this.usersService.updateUser(user.id, body);
  }

  @ApiOperation({ summary: 'delete user' })
  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteUser(@CurrentUser() user: User) {
    return await this.usersService.deleteUser(user.id);
  }
}
