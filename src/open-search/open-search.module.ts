import { Module } from '@nestjs/common';
import { OpenSearchController } from './open-search.controller';
import { OpenSearchService } from './open-search.service';

@Module({
  controllers: [OpenSearchController],
  providers: [OpenSearchService]
})
export class OpenSearchModule {}
