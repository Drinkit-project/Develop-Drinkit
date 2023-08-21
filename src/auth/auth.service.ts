import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { Payload } from './security/payload.interface';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from 'src/entities/user.entity';
import { JwtConfigService } from '../../config/jwt.config.service';
import * as nodemailer from 'nodemailer';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UserInfo } from 'src/entities/redis.userInfo';

@Injectable()
export class AuthService {
  //이메일 인증용
  // private transporter: nodemailer.Transporter;
  constructor(
    @Inject(CACHE_MANAGER) private cache: Cache,
    private jwtConfigService: JwtConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    //이메일 인증용
    // this.transporter = nodemailer.createTransport({
    //   service: 'Gmail', // 이메일 서비스 제공자 설정
    //   auth: {
    //     user: process.env.NODEMAILER_EMAIL, // 발신자 이메일 주소
    //     pass: process.env.NODEMAILER_EMAIL_PASSWORD, // 발신자 이메일 비밀번호 (보안에 주의)
    //   },
    // });
  }

  //회원가입
  async signUp(data: UserDto) {
    const { password, confirm, email } = data;

    if (password !== confirm) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    const isUserExist = await this.usersService.findByFields({
      where: { email },
    });

    if (isUserExist) {
      throw new UnauthorizedException('이미 존재하는 사용자 입니다.');
    }

    await this.usersService.createUser(data);

    return {
      statusCode: 201,
      message: '회원가입 성공',
    };
  }

  //로그인
  async signIn(
    data: Partial<UserDto>,
  ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
    const { email, password } = data;

    const user = await this.usersService.findByFields({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('email 또는 password를 확인해주세요.');
    }

    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('email 또는 password를 확인해주세요.');
    }

    const accessToken = await this.generateAccessToken(user.id);
    const refreshToken = await this.generateRefreshToken(user.id);

    return { accessToken, refreshToken };
  }

  //비밀번호 변경
  async updateUserPassword(id: number, data: UpdateUserDto) {
    const { newPassword, confirm } = data;

    if (newPassword !== confirm) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    const user = await this.usersService.findByFields({
      where: { id },
    });

    const isPasswordValidated: boolean = await bcrypt.compare(
      user.password,
      newPassword,
    );

    if (isPasswordValidated) {
      throw new UnauthorizedException('현재와 같은 비밀번호 입니다.');
    }

    await this.usersService.updateUserPassword(id, newPassword);

    return {
      statusCode: 201,
      message: '비밀번호 수정 성공',
    };
  }

  //회원 탈퇴 (soft delete)
  async deleteUser(id: number) {
    const user = await this.usersService.findByFields({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('존재하지 않는 사용자 입니다.');
    }

    await this.usersService.deleteUser(id);

    return {
      statusCode: 201,
      message: '회원정보 삭제 성공',
    };
  }

  //토큰에 저장된 유저 id로 유저 조회
  async tokenValidateUser(payload: Payload): Promise<User | undefined> {
    return await this.usersService.findByFields({
      where: { id: payload.userId },
    });
  }

  //토큰 존재 시 한번 더 인증이 필요할 때, 비밀번호 인증
  async authenticationByPassword(
    id: number,
    password: string,
  ): Promise<boolean> {
    const user = await this.usersService.findByFields({
      where: { id },
    });

    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (isPasswordValidated) return true;
    else return false;
  }

  // 액세스 토큰 생성
  async generateAccessToken(userId: number): Promise<string> {
    const payload = { userId };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }

  // 리프레시 토큰 생성
  async generateRefreshToken(userId: number): Promise<string> {
    const payload = { userId };
    const refreshTokenOptions = this.jwtConfigService.createRefreshJwtOptions(); // 리프레시 토큰 설정을 가져옴
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: refreshTokenOptions.secret,
      expiresIn: refreshTokenOptions.signOptions.expiresIn,
    });

    await this.cache.set('refreshToken:' + userId, refreshToken);
    return refreshToken;
  }

  async isRefreshTokenValid(
    refreshToken: string,
    userId: number,
  ): Promise<boolean> {
    try {
      const redisRefreshToken = await this.cache.store.get<'refreshToken'>(
        'refreshToken:' + userId,
      ); //레디스에서 가져온 리프레시 토큰;
      console.log('레디스 리프레시토큰:' + redisRefreshToken);
      if (!this.isClientRefreshTokenExpired(redisRefreshToken)) return false;
      if (refreshToken !== redisRefreshToken) return false;
      // 사용자가 보낸 리프레시 토큰과 레디스에 저장된 리프레시 토큰을 비교합니다.

      return true;
    } catch (error) {
      return false;
    }
  }

  // 액세스 토큰의 만료 여부 확인
  isAccessTokenExpired(expiration: number): boolean {
    const currentTime = Date.now() / 1000;
    return expiration <= currentTime;
  }

  async isClientRefreshTokenExpired(
    refreshToken: string,
  ): Promise<boolean | Payload> {
    try {
      const refreshJwtOptions = this.jwtConfigService.createRefreshJwtOptions();
      const secret = refreshJwtOptions.secret;

      // 클라이언트가 보낸 리프레시 토큰의 만료 여부를 검증합니다.
      const verifiedRefreshToken = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret,
        },
      );

      return verifiedRefreshToken; // 리프레시 토큰이 유효함
    } catch (error) {
      return false; // 검증 실패 또는 예외 발생으로 인한 만료 처리
    }
  }
}
