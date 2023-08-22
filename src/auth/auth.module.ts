import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './security/jwt.strategy';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfigService } from 'config/jwt.config.service';
import { UsersService } from 'src/user/users.service';
import { UsersRepository } from 'src/user/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  ],
  exports: [AuthService, JwtStrategy],
  providers: [
    AuthService,
    JwtStrategy,
    JwtConfigService,
    UsersService,
    UsersRepository,
  ],
})
export class AuthModule {}
