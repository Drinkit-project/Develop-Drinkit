import { Module } from '@nestjs/common';
import { SubscribesController } from './subscribes.controller';
import { SubscribesService } from './subscribes.service';
import { Subscribe } from 'src/entities/subscribe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscribesRepository } from './subscribes.repository';
import { UsersRepository } from 'src/user/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Subscribe])],
  controllers: [SubscribesController],
  providers: [SubscribesService, SubscribesRepository, UsersRepository],
})
export class SubscribesModule {}
