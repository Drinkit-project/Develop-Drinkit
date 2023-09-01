import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './security/payload.interface';
import { JwtConfigService } from '../../config/jwt.config.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import * as nodemailer from 'nodemailer';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class AuthService {
  //이메일 인증용
  private transporter: nodemailer.Transporter;

  constructor(
    @Inject(CACHE_MANAGER) private cache: Cache,
    private jwtConfigService: JwtConfigService,
    private jwtService: JwtService,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
  ) {
    //이메일 인증용
    this.transporter = nodemailer.createTransport({
      host: 'smtp.naver.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.NODEMAILER_EMAIL, // 발신자 이메일 주소
        pass: process.env.NODEMAILER_EMAIL_PASSWORD, // 발신자 이메일 비밀번호 (보안에 주의)
      },
    });
  }

  //메일 전송
  async sendVerificationEmail(email: string) {
    const baseUrl = 'http://localhost:3000/user/emailTokenAuth';
    const emailToken = await this.generateEmailToken(email);
    const url = `${baseUrl}?emailToken=${emailToken}`;

    const mailOptions = {
      to: email,
      from: process.env.NODEMAILER_EMAIL,
      subject: '가입 인증 메일',
      html: `가입 확인 버튼을 누르시면 가입 인증이 완료됩니다.<br/>
              <form action="${url}" method="POST">
              <button>가입확인</button>
            </form>`,
    };
    try {
      return await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new UnauthorizedException(
        '인증 정보 발송에 실패하였습니다. 메일 주소를 다시 확인해 주세요.',
      );
    }
  }

  async verifyVerificationCode(emailToken: string): Promise<any> {
    const emailTokenOptions = this.jwtConfigService.createEmailJwtOptions();
    const secret = emailTokenOptions.secret;

    // 클라이언트가 보낸 리프레시 토큰의 만료 여부를 검증합니다.
    try {
      const verifiedEmailToken = await this.jwtService.verifyAsync(emailToken, {
        secret,
      });

      return verifiedEmailToken.email;
    } catch (error) {
      throw new UnauthorizedException('인증이 유효하지 않습니다.');
    }
  }

  // 이메일토큰 생성
  async generateEmailToken(email: string): Promise<string> {
    const payload = { email };
    const emailTokenOptions = this.jwtConfigService.createEmailJwtOptions();
    const emailToken = await this.jwtService.signAsync(payload, {
      secret: emailTokenOptions.secret,
      expiresIn: emailTokenOptions.signOptions.expiresIn,
    });
    return emailToken;
  }

  // 액세스 토큰 생성
  async generateAccessToken(userId: number, nickname: string): Promise<string> {
    const payload = { userId, nickname };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }

  // 리프레시 토큰 생성
  async generateRefreshToken(
    userId: number,
    nickname: string,
  ): Promise<string> {
    const payload = { userId, nickname };
    const refreshTokenOptions = this.jwtConfigService.createRefreshJwtOptions(); // 리프레시 토큰 설정을 가져옴
    console.log(refreshTokenOptions.secret);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: refreshTokenOptions.secret,
      expiresIn: refreshTokenOptions.signOptions.expiresIn,
    });

    await this.cache.set('refreshToken:' + userId, refreshToken);
    return refreshToken;
  }

  //레디스에 저장된 리프레시 토큰과 클라이언트의 리프레시 토큰 대조 및 레디스의 토큰 검증
  async isRefreshTokenValid(
    refreshToken: string,
    userId: number,
  ): Promise<boolean> {
    try {
      const redisRefreshToken = await this.cache.store.get<'refreshToken'>(
        'refreshToken:' + userId,
      ); //레디스에서 가져온 리프레시 토큰;
      if (!this.isRefreshTokenExpired(redisRefreshToken)) return false;
      if (refreshToken !== redisRefreshToken) return false;
      // 사용자가 보낸 리프레시 토큰과 레디스에 저장된 리프레시 토큰을 비교합니다.

      return true;
    } catch (error) {
      return false;
    }
  }

  //리프레시 토큰의 만료 여부 확인
  async isRefreshTokenExpired(
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
