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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { AuthGuard } from '../auth/security/jwt.guard';
import { Response } from 'express';
import { CurrentUser } from 'src/commons/decorators/user.decorators';
import { UsersService } from './users.service';
import { ProfilesService } from './profiles.service';
import { ProfileDto } from './dto/Profile.dto';

@ApiTags('users')
@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private profilesService: ProfilesService,
  ) {}

  @ApiOperation({ summary: 'sign-up' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Post('/signUp')
  async signUp(@Body() data: UserDto) {
    return await this.usersService.signUp(data);
  }

  @ApiOperation({ summary: 'sign-in' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Post('/signIn')
  async signIn(@Body() data: Partial<UserDto>, @Res() response: Response) {
    const tokens = await this.usersService.signIn(data);

    // 액세스 토큰과 리프레시 토큰을 쿠키로 설정하여 클라이언트에게 전달
    response.cookie('AccessToken', 'Bearer ' + tokens.accessToken);
    response.cookie('RefreshToken', 'Bearer ' + tokens.refreshToken);

    // 반환값으로 액세스 토큰과 리프레시 토큰을 클라이언트에게 전달
    return response.json(tokens);
  }

  @ApiOperation({ summary: 'sign-out' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UseGuards(AuthGuard)
  @Delete('/signOut')
  async signout(@Res() response: Response) {
    response.clearCookie('Authentication');
    return response.status(200).send('signed out successfully');
  }

  @ApiOperation({ summary: 'update user' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UseGuards(AuthGuard)
  @Patch()
  async updateUserPassword(
    @CurrentUser() userId: number,
    @Body() data: UpdateUserDto,
  ) {
    return await this.usersService.updateUserPassword(userId, data);
  }

  @ApiOperation({ summary: 'delete user' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UseGuards(AuthGuard)
  @Delete()
  async deleteUser(@CurrentUser() userId: number) {
    return await this.usersService.deleteUser(userId);
  }

  @ApiOperation({ summary: 'get user' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UseGuards(AuthGuard)
  @Get('/authenticate')
  async getUser(@CurrentUser() userId: number, @Body() data: Partial<UserDto>) {
    const userchecked = await this.usersService.authenticationByPassword(
      userId,
      data.password,
    );
    return userchecked;
  }

  @Get('profile') // 프로필 조회
  @ApiOperation({ summary: 'Get profile' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  getProfile(@CurrentUser() userId: number) {
    const profile = await this.profilesService.getProfile(userId);
    return profile;
  }

  @ApiOperation({ summary: 'update profile' })
  @UseGuards(AuthGuard)
  @Put('profile')
  updateProfile(
    @CurrentUser() userId: number,
    @Body() data: Partial<ProfileDto>,
  ) {
    return await this.profilesService.updateProfile(userId, data);
  }

  @Post('/address')
  @ApiOperation({ summary: 'add address' })
  @UseGuards(AuthGuard)
  addAddress(@CurrentUser() userId: number, @Body() data: Partial<ProfileDto>) {
    return await this.profilesService.addAddress(userId, data);
  }

  @ApiOperation({ summary: 'update address' })
  @UseGuards(AuthGuard)
  @Put('/address')
  updateAddress(
    @CurrentUser() userId: number,
    @Query('addressIdx', ParseIntPipe) addressIdx: number,
    @Body() data: Partial<ProfileDto>,
  ) {
    return await this.profilesService.updateAddress(userId, addressIdx, data);
  }

  @ApiOperation({ summary: 'delete address' })
  @UseGuards(AuthGuard)
  @Delete('/address')
  delteAddress(
    @CurrentUser() userId: number,
    @Query('addressIdx', ParseIntPipe) addressIdx: number,
  ) {
    return await this.profilesService.delteAddress(userId, addressIdx);
  }
}
