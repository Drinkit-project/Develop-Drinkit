import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { ProfilesService } from './profiles.service';
import { Profile } from 'src/entities/profile.entity';
import { ProfilesRepository } from './profiles.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile]), AuthModule],
  controllers: [UsersController],
  providers: [
    ProfilesService,
    ProfilesRepository,
    UsersService,
    UsersRepository,
  ],
  exports: [UsersService],
})
export class UsersModule {}
