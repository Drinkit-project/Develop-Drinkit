import { Controller, Get, Query } from '@nestjs/common';
import { OpenSearchService } from './open-search.service';

@Controller('open-search')
export class OpenSearchController {
  constructor(private readonly openSearchService: OpenSearchService) {}

  @Get()
  async getSearch(@Query('keyword') keyword: string) {
    const getSearchData = await this.openSearchService.getSearch(keyword);
    return getSearchData;
  }
}
