import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { FindOneOptions } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import UpdateUserDto from 'src/user/dto/updateUser.dto';
import { AuthService } from 'src/auth/auth.service';
import { Payload } from 'src/auth/security/payload.interface';

@Injectable()
export class UsersService {
  constructor(
    private authService: AuthService,
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  //field에 따른 조회
  async findByFields(options: FindOneOptions<User>): Promise<User | undefined> {
    return await this.usersRepository.findOne(options);
  }

  //비밀번호 암호화
  async transformPassword(password: string): Promise<string> {
    const transformedPassword = await bcrypt.hash(password, 10);
    return transformedPassword;
  }

  //로그인
  async signIn(
    data: Partial<UserDto>,
  ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
    const { email, password } = data;

    const user = await this.findByFields({
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

    const accessToken = await this.authService.generateAccessToken(user.id);
    const refreshToken = await this.authService.generateRefreshToken(user.id);

    return { accessToken, refreshToken };
  }

  //회원가입
  async signUp(data: UserDto) {
    const { email, password, confirm, isAdmin, isPersonal } = data;

    if (password !== confirm) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    const isUserExist = await this.findByFields({
      where: { email },
    });

    if (isUserExist) {
      throw new UnauthorizedException('이미 존재하는 사용자 입니다.');
    }

    const hashedPassword = await this.transformPassword(password);

    await this.usersRepository.insert({
      email,
      password: hashedPassword,
      isAdmin,
      isPersonal,
      point: 0,
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