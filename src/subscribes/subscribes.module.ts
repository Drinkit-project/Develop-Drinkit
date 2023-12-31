import { Module } from '@nestjs/common';
import { SubscribesController } from './subscribes.controller';
import { SubscribesService } from './subscribes.service';
import { Subscribe } from 'src/entities/subscribe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscribesRepository } from './subscribes.repository';
import { UsersModule } from 'src/user/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { Profile } from 'src/entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscribe]),
    UsersModule,
    AuthModule,
    Profile,
  ],
  controllers: [SubscribesController],
  providers: [SubscribesService, SubscribesRepository],
})
export class SubscribesModule {}
