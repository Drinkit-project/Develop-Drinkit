import { Controller, Get, Body } from '@nestjs/common';
import { OpenSearchService } from './open-search.service';
import { OpenSearchDto } from './dto/open-search.dto';

@Controller('open-search')
export class OpenSearchController {
  constructor(private readonly openSearchService: OpenSearchService) {}

  @Get()
  async getSearch(@Body() body: OpenSearchDto) {
    const getSearchData = await this.openSearchService.getSearch(body.keyword);
    return getSearchData['body']['hits']['hits'];
  }
}
