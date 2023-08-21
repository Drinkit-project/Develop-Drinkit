import {
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
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

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
  async signIn(data: Partial<UserDto>): Promise<string | undefined> {
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

    //액세스토큰 생성
    const payload: Payload = { userId: user.id };
    return await this.jwtService.signAsync(payload);
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
}
