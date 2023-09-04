import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Res,
  Patch,
  UseGuards,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { AuthGuard } from '../auth/security/jwt.guard';
import { AuthGuard as OriginAuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CurrentUser } from 'src/commons/decorators/user.decorators';
import { UsersService } from './users.service';
import { ProfilesService } from './profiles.service';
import { ProfileDto } from './dto/Profile.dto';
import createUserDto from './dto/createUser.dto';
import { User } from 'src/entities/user.entity';

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
  async signUp(@Body() data: createUserDto) {
    return await this.usersService.signUp(data);
  }

  @Post('/emailAuth')
  async sendEmail(@Body() body: Partial<UserDto>) {
    return await this.usersService.sendEmail(body.email);
  }

  @Post('/emailTokenAuth')
  async authEmail(
    @Query('emailToken') emailToken: string,
    @Res() response: Response,
  ) {
    const email = await this.usersService.authEmail(emailToken);
    if (email) {
      response.cookie(`email`, email);
      return response.redirect('http://localhost:3200/signup');
    } else return response.status(400);
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

  @Get('/login/google') //restAPI만들기. 엔드포인트는 /login/google.
  @UseGuards(OriginAuthGuard('google')) //인증과정을 거쳐야하기때문에 UseGuards를 써주고 passport인증으로 AuthGuard를 써준다. 이름은 google로
  async loginGoogle(
    @Req() request: Request,
    @Res() response: Response, //Nest.js가 express를 기반으로 하기때문에 Request는 express에서 import한다.
  ) {
    //프로필을 받아온 다음, 로그인 처리해야하는 곳(auth.service.ts에서 선언해준다)
    const tokens = await this.usersService.oAuthSignIn({ request, response });

    if (!tokens) return response.redirect('http://localhost:3200/signup');

    response.cookie('AccessToken', 'Bearer ' + tokens.accessToken);
    response.cookie('RefreshToken', 'Bearer ' + tokens.refreshToken);

    return response.redirect('http://localhost:3200');
  }

  //카카오
  @Get('/login/kakao')
  @UseGuards(OriginAuthGuard('kakao'))
  async loginKakao(@Req() request: Request, @Res() response: Response) {
    const tokens = await this.usersService.oAuthSignIn({ request, response });

    if (!tokens) return response.redirect('http://localhost:3200/signup');

    response.cookie('AccessToken', 'Bearer ' + tokens.accessToken);
    response.cookie('RefreshToken', 'Bearer ' + tokens.refreshToken);

    return response.redirect('http://localhost:3200');
  }

  //네이버
  @Get('/login/naver')
  @UseGuards(OriginAuthGuard('naver'))
  async loginNaver(@Req() request: Request, @Res() response: Response) {
    const tokens = await this.usersService.oAuthSignIn({ request, response });

    if (!tokens) return response.redirect('http://localhost:3200/signup');

    response.cookie('AccessToken', 'Bearer ' + tokens.accessToken);
    response.cookie('RefreshToken', 'Bearer ' + tokens.refreshToken);

    return response.redirect('http://localhost:3200');
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

  @Get('/profile') // 프로필 조회
  @ApiOperation({ summary: 'Get profile' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UseGuards(AuthGuard)
  async getProfile(@CurrentUser() user: User) {
    const profile = await this.profilesService.getProfile(user.id);
    return profile;
  }

  @Get('/address') // 주소 조회
  @ApiOperation({ summary: 'Get profile' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UseGuards(AuthGuard)
  async getAddress(@CurrentUser() user: User) {
    return await this.profilesService.getAddress(user.id);
  }

  @Put('/profile')
  @ApiOperation({ summary: 'update profile' })
  @UseGuards(AuthGuard)
  updateProfile(@CurrentUser() user: User, @Body() data: Partial<ProfileDto>) {
    return this.profilesService.updateProfile(user.id, data);
  }

  @Post('/address')
  @ApiOperation({ summary: 'add address' })
  @UseGuards(AuthGuard)
  addAddress(@CurrentUser() user: User, @Body() data: Partial<ProfileDto>) {
    return this.profilesService.addAddress(user.id, data);
  }

  @Patch('/address')
  @ApiOperation({ summary: 'update address' })
  @UseGuards(AuthGuard)
  updateAddress(
    @CurrentUser() user: User,
    @Query('addressIdx') addressIdx: number,
    @Body() data: Partial<ProfileDto>,
  ) {
    return this.profilesService.updateAddress(user.id, addressIdx, data);
  }

  @Delete('/address')
  @ApiOperation({ summary: 'delete address' })
  @UseGuards(AuthGuard)
  delteAddress(
    @CurrentUser() user: User,
    @Query('addressIdx') addressIdx: number,
  ) {
    return this.profilesService.delteAddress(user.id, addressIdx);
  }
}
