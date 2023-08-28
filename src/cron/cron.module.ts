import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { OpenSearchService } from 'src/open-search/open-search.service';
import { ProductsService } from 'src/products/products.service';
import { ProductsRepository } from 'src/products/products.repository';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [
    CronService,
    OpenSearchService,
    ProductsService,
    ProductsRepository,
  ],
})
export class CronModule {}
