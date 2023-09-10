import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { DataSource, FindOneOptions } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import UpdateUserDto from 'src/user/dto/updateUser.dto';
import { AuthService } from 'src/auth/auth.service';
import { Payload } from 'src/auth/security/payload.interface';
import { ProfilesService } from './profiles.service';
import createUserDto from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    private dataSource: DataSource,
    private profilesService: ProfilesService,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  //field에 따른 조회
  async findByFields(options: FindOneOptions<User>): Promise<any> {
    return await this.usersRepository.findUser(options);
  }

  async findByFieldsForSignIn(options: FindOneOptions<User>): Promise<any> {
    return await this.usersRepository.findUserForSignIn(options);
  }

  //비밀번호 암호화
  async transformPassword(password: string): Promise<string> {
    const transformedPassword = await bcrypt.hash(password, 10);
    return transformedPassword;
  }

  async sendEmail(email: string): Promise<void> {
    const isUserExist = await this.findByFields({
      where: { email },
    });

    if (isUserExist) {
      throw new UnauthorizedException('이미 존재하는 사용자 입니다.');
    }

    return await this.authService.sendVerificationEmail(email);
  }

  async sendSMS(phoneNumber: string) {
    const isUserExist = await this.profilesService.findByFields({
      where: { phoneNumber },
    });

    if (isUserExist) {
      throw new UnauthorizedException('이미 존재하는 사용자 입니다.');
    }

    return await this.authService.sendSMS(phoneNumber);
  }

  async authEmail(emailToken: string): Promise<any> {
    return await this.authService.verifyVerificationCode(emailToken);
  }

  async authCode(body: {
    phoneNumber: string;
    code: string;
  }): Promise<boolean> {
    const { phoneNumber, code } = body;
    try {
      const redisCode = await this.authService.authCode(phoneNumber);
      if (redisCode === code) {
        return true;
      }
      return false;
    } catch (error) {
      console.error(error); // 오류 로깅
      throw error; // 오류 재전파 (선택사항)
    }
  }

  //로그인
  async signIn(
    data: Partial<UserDto>,
  ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
    const { email, password } = data;

    const user = await this.findByFieldsForSignIn({
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

    const accessToken = await this.authService.generateAccessToken(
      user.id,
      user.nickname,
    );
    const refreshToken = await this.authService.generateRefreshToken(
      user.id,
      user.nickname,
    );

    return { accessToken, refreshToken };
  }

  async oAuthSignIn({ request, response }) {
    // 1. 회원조회
    const user = await this.findByFieldsForSignIn({
      where: { email: request.user.email },
    }); //user를 찾아서
    // 2, 회원가입이 안되어있다면? 자동회원가입
    if (!user) {
      response.cookie(`email`, request.user.email, {
        secure: true,
        sameSite: 'none',
        domain: 'othwan.shop',
      });
      return false; //user가 없으면 하나 만들고, 있으면 이 if문에 들어오지 않을거기때문에 이러나 저러나 user는 존재하는게 됨.
    }
    // 3. 회원가입이 되어있다면? 로그인(AT, RT를 생성해서 브라우저에 전송)한다
    const accessToken = await this.authService.generateAccessToken(
      user.id,
      user.nickname,
    );
    const refreshToken = await this.authService.generateRefreshToken(
      user.id,
      user.nickname,
    );

    return { accessToken, refreshToken };
  }

  //회원가입
  async signUp(data: createUserDto) {
    const {
      email,
      password,
      confirm,
      isAdmin,
      isPersonal,
      address,
      phoneNumber,
      nickname,
      name,
    } = data;

    if (password !== confirm) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    const hashedPassword = await this.transformPassword(password);

    return await this.dataSource.transaction(async (manager) => {
      const result = await manager
        .createQueryBuilder()
        .insert()
        .into(User, [
          'email',
          'password',
          'isAdmin',
          'isPersonal',
          'name',
          'point',
        ])
        .values({
          email,
          password: hashedPassword,
          isAdmin,
          isPersonal,
          point: 0,
        })
        .execute();

      const [user] = result.identifiers;
      await this.profilesService.createProfile(
        user.id,
        address,
        phoneNumber,
        nickname,
        name,
        manager,
      );
    });
  }

  //토큰 존재 시 한번 더 인증이 필요할 때, 비밀번호 인증
  async authenticationByPassword(
    id: number,
    password: string,
  ): Promise<boolean> {
    const user = await this.findByFields({
      where: { id },
    });

    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (isPasswordValidated) return true;
    else return false;
  }

  //비밀번호 변경
  async updateUserPassword(id: number, data: UpdateUserDto) {
    const { newPassword, confirm } = data;

    if (newPassword !== confirm) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    const user = await this.findByFields({
      where: { id },
    });

    const isPasswordValidated: boolean = await bcrypt.compare(
      newPassword,
      user.password,
    );

    if (isPasswordValidated) {
      throw new UnauthorizedException('현재와 같은 비밀번호 입니다.');
    }

    const hashedPassword = await this.transformPassword(newPassword);

    await this.usersRepository.update(
      { id },
      {
        password: hashedPassword,
      },
    );

    return {
      statusCode: 201,
      message: '비밀번호 수정 성공',
    };
  }

  //토큰에 저장된 유저 id로 유저 조회
  async tokenValidateUser(payload: Payload): Promise<User | undefined> {
    return await this.findByFields({
      where: { id: payload.userId },
    });
  }

  //회원 탈퇴 (soft delete)
  async deleteUser(id: number) {
    const user = await this.findByFields({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('존재하지 않는 사용자 입니다.');
    }

    await this.usersRepository.softDelete(id);

    return {
      statusCode: 201,
      message: '회원정보 삭제 성공',
    };
  }
}
