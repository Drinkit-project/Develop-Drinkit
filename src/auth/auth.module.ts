import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './security/jwt.strategy';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfigService } from 'config/jwt.config.service';
import { ProfilesService } from 'src/user/profiles.service';
import { ProfilesRepository } from 'src/user/profiles.repository';
import { UsersModule } from 'src/user/users.module';
import { UsersService } from 'src/user/users.service';
import { UsersRepository } from 'src/user/users.repository';

@Module({
  imports: [
    forwardRef(() => UsersModule),
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
    ProfilesService,
    ProfilesRepository,
    AuthService,
    JwtStrategy,
    JwtConfigService,
  ],
})
export class AuthModule {}
