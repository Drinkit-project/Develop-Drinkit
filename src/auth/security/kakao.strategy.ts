import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
      scope: ['account_email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    return {
      email: profile._json.kakao_account.email,
    };
  }
}
