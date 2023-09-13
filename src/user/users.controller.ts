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
import { Response, Request } from 'express';
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

  //회원가입
  @ApiOperation({ summary: 'sign-up' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Post('/signUp')
  async signUp(
    @Body() data: createUserDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    if (!request.cookies.email) {
      return response.status(302).json({ message: '쿠키가 없어서 가입 실패' });
    }
    await this.usersService.signUp(data, request.cookies.email);
    response.cookie('email', '', {
      maxAge: 0,
      secure: true,
      sameSite: 'none',
      domain: 'othwan.shop',
    });
    return response.status(201).json({ message: '가입 성공' });
  }

  //휴대폰 인증 SMS 발송
  @Post('/phoneAuth')
  async sendSMS(@Body() body: Partial<ProfileDto>, @Res() response: Response) {
    try {
      return await this.usersService.sendSMS(body.phoneNumber);
    } catch (error) {
      return response.status(401).json({ message: '인증 실패' });
    }
  }

  @Post('/phoneCodeAuth')
  async authCode(
    @Res() response: Response,
    @Body() body: { phoneNumber: string; code: string },
  ) {
    const isAuth = await this.usersService.authCode(body);
    if (isAuth) {
      // 성공적인 인증일 경우, 상태 코드 201과 함께 JSON 응답을 보냅니다.
      return response.status(201).json({ message: '인증 성공' });
    }

    // 인증 실패일 경우, 상태 코드 401과 함께 JSON 응답을 보냅니다.
    return response.status(401).json({ message: '인증 실패' });
  }

  //이메일 인증 전송
  @Post('/emailAuth')
  async sendEmail(@Body() body: Partial<UserDto>) {
    return await this.usersService.sendEmail(body.email);
  }

  //이메일 인증
  @Post('/emailTokenAuth')
  async authEmail(
    @Query('emailToken') emailToken: string,
    @Res() response: Response,
  ) {
    const email = await this.usersService.authEmail(emailToken);
    if (email) {
      response.cookie(`email`, email, {
        secure: true,
        sameSite: 'none',
        domain: 'othwan.shop',
      });
      return response.redirect(`${process.env.REDIRECT_URL}/signup`);
    } else return response.status(400);
  }

  //로그인
  @ApiOperation({ summary: 'sign-in' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Post('/signIn')
  async signIn(@Body() data: Partial<UserDto>, @Res() response: Response) {
    const tokens = await this.usersService.signIn(data);

    // 액세스 토큰과 리프레시 토큰을 쿠키로 설정하여 클라이언트에게 전달
    response.cookie('AccessToken', 'Bearer ' + tokens.accessToken, {
      secure: true,
      sameSite: 'none',
      domain: 'othwan.shop',
    });
    response.cookie('RefreshToken', 'Bearer ' + tokens.refreshToken, {
      secure: true,
      sameSite: 'none',
      domain: 'othwan.shop',
    });

    // 반환값으로 액세스 토큰과 리프레시 토큰을 클라이언트에게 전달
    return response.json(tokens);
  }

  //구글 로그인
  @Get('/login/google') //restAPI만들기. 엔드포인트는 /login/google.
  @UseGuards(OriginAuthGuard('google')) //인증과정을 거쳐야하기때문에 UseGuards를 써주고 passport인증으로 AuthGuard를 써준다. 이름은 google로
  async loginGoogle(
    @Req() request: Request,
    @Res() response: Response, //Nest.js가 express를 기반으로 하기때문에 Request는 express에서 import한다.
  ) {
    //프로필을 받아온 다음, 로그인 처리해야하는 곳(auth.service.ts에서 선언해준다)
    const tokens = await this.usersService.oAuthSignIn({ request, response });

    if (!tokens) return response.redirect(`${process.env.REDIRECT_URL}/signup`);

    response.cookie('AccessToken', 'Bearer ' + tokens.accessToken, {
      secure: true,
      sameSite: 'none',
      domain: 'othwan.shop',
    });
    response.cookie('RefreshToken', 'Bearer ' + tokens.refreshToken, {
      secure: true,
      sameSite: 'none',
      domain: 'othwan.shop',
    });

    return response.json(tokens);
  }

  //카카오 로그인
  @Get('/login/kakao')
  @UseGuards(OriginAuthGuard('kakao'))
  async loginKakao(@Req() request: Request, @Res() response: Response) {
    const tokens = await this.usersService.oAuthSignIn({ request, response });

    if (!tokens) return response.redirect(`${process.env.REDIRECT_URL}/signup`);

    response.cookie('AccessToken', 'Bearer ' + tokens.accessToken, {
      secure: true,
      sameSite: 'none',
      domain: 'othwan.shop',
    });
    response.cookie('RefreshToken', 'Bearer ' + tokens.refreshToken, {
      secure: true,
      sameSite: 'none',
      domain: 'othwan.shop',
    });

    return response.redirect(`${process.env.REDIRECT_URL}`);
  }

  //네이버 로그인
  @Get('/login/naver')
  @UseGuards(OriginAuthGuard('naver'))
  async loginNaver(@Req() request: Request, @Res() response: Response) {
    const tokens = await this.usersService.oAuthSignIn({ request, response });

    if (!tokens) return response.redirect(`${process.env.REDIRECT_URL}/signup`);

    response.cookie('AccessToken', 'Bearer ' + tokens.accessToken, {
      secure: true,
      sameSite: 'none',
      domain: 'othwan.shop',
    });
    response.cookie('RefreshToken', 'Bearer ' + tokens.refreshToken, {
      secure: true,
      sameSite: 'none',
      domain: 'othwan.shop',
    });

    return response.redirect(`${process.env.REDIRECT_URL}`);
  }

  //로그아웃
  @ApiOperation({ summary: 'sign-out' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Delete('/signOut')
  async signout(@Req() request: Request, @Res() response: Response) {
    response.cookie('AccessToken', '', {
      maxAge: 0,
      secure: true,
      sameSite: 'none',
      domain: 'othwan.shop',
    });
    response.cookie('RefreshToken', '', {
      maxAge: 0,
      secure: true,
      sameSite: 'none',
      domain: 'othwan.shop',
    });
    return response.status(200).send('signed out successfully');
  }

  //로그인된 상황에 비밀번호 검사(비밀번호 변경 시)
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

  //유저 비밀번호 변경
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

  //회원 탈퇴
  @ApiOperation({ summary: 'delete user' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UseGuards(AuthGuard)
  @Delete()
  async deleteUser(@CurrentUser() userId: number) {
    return await this.usersService.deleteUser(userId);
  }

  // 프로필 조회
  @Get('/profile')
  @ApiOperation({ summary: 'Get profile' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UseGuards(AuthGuard)
  async getProfile(@CurrentUser() user: User, @Req() request: Request) {
    const profile = await this.profilesService.getProfile(user.id);
    const tokens = {
      accessToken: request.cookies.AccessToken,
      refreshToken: request.cookies.RefreshToken,
    };

    return { profile, tokens };
  }

  // 주소 조회
  @Get('/address')
  @ApiOperation({ summary: 'Get profile' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UseGuards(AuthGuard)
  async getAddress(@CurrentUser() user: User) {
    return await this.profilesService.getAddress(user.id);
  }

  // 프로필 수정
  @Put('/profile')
  @ApiOperation({ summary: 'update profile' })
  @UseGuards(AuthGuard)
  updateProfile(@CurrentUser() user: User, @Body() data: Partial<ProfileDto>) {
    return this.profilesService.updateProfile(user.id, data);
  }

  //주소 추가
  @Post('/address')
  @ApiOperation({ summary: 'add address' })
  @UseGuards(AuthGuard)
  addAddress(@CurrentUser() user: User, @Body() data: Partial<ProfileDto>) {
    return this.profilesService.addAddress(user.id, data);
  }

  //주소 변경
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

  //주소 삭제
  @Delete('/address')
  @ApiOperation({ summary: 'delete address' })
  @UseGuards(AuthGuard)
  delteAddress(
    @CurrentUser() user: User,
    @Query('addressIdx') addressIdx: number,
  ) {
    return this.profilesService.delteAddress(user.id, addressIdx);
  }

  // 더미데이터 생성
  // @Post('/seed')
  // async seed() {
  //   for (let i = 0; i < 1000; i++) {
  //     const randLat = 35.2696 + Math.floor(Math.random() * 28000) / 10000;
  //     const randLng = 126.5503 + Math.floor(Math.random() * 32000) / 10000;
  //     const rand = `aaa${i}`;
  //     const randPhonNum = `010${String(i)}`;
  //     const email = `${rand}@naver.com`;
  //     const data = {
  //       password: `${rand}`,
  //       confirm: `${rand}`,
  //       isAdmin: false,
  //       isPersonal: true,
  //       address: {
  //         address: '제주시',
  //         name: '나의 집',
  //         lat: randLat,
  //         lng: randLng,
  //       },
  //       phoneNumber: randPhonNum,
  //       nickname: `${rand}`,
  //       name: `${rand}`,
  //     };
  //     if (i % 1000 == 0) {
  //       console.log(`${i}번째`);
  //     }
  //     await this.usersService.signUp(data, email);
  //   }
  //   return '작업완료';
  // }
}
