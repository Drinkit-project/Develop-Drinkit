import { Module } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import { Store_ProductsRepository } from './stores_products.repository';
import { StoresRepository } from './stores.repository';
import { UsersRepository } from 'src/user/users.repository';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [AuthModule],
  controllers: [StoresController],
  providers: [
    StoresService,
    Store_ProductsRepository,
    StoresRepository,
    UsersRepository,
  ],
})
export class StoresModule {}
