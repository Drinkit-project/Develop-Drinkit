import { Module } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import { StoresRepository } from './stores.repository';
import { UsersRepository } from 'src/user/users.repository';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/user/users.module';
import { Store_ProductRepository } from './store_product.repository';
@Module({
  imports: [AuthModule, UsersModule],
  controllers: [StoresController],
  providers: [
    StoresService,
    StoresRepository,
    Store_ProductRepository,
    UsersRepository,
  ],
})
export class StoresModule {}
