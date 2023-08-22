import { Module } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import { Store_ProductsRepository } from './stores_products.repository';
import { StoresRepository } from './stores.repository';
@Module({
  controllers: [StoresController],
  providers: [StoresService, Store_ProductsRepository, StoresRepository],
})
export class StoresModule {}
