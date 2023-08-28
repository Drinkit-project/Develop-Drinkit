import { Injectable } from '@nestjs/common';
import { Client } from '@opensearch-project/opensearch';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenSearchService {
  private readonly client: Client;
  constructor(private readonly configService: ConfigService) {
    this.client = new Client({
      node: this.configService.get('OPEN_SEARCH_HOST'),
      auth: {
        username: this.configService.get('OPEN_SEARCH_NAME'),
        password: this.configService.get('OPEN_SEARCH_PASSWORD'),
      },
    });
  }
  async uploadSearch(productId: number, productName: string) {
    const document = {
      id: Number(productId),
      productName: productName,
    };

    const createDocument = await this.client.index({
      index: this.configService.get('OPEN_SEARCH_INDEX'),
      body: document,
      id: String(productId),
    });
    return createDocument;
  }

  async getSearch(keyword: string) {
    const query = {
      query: {
        match: {
          productName: {
            query: keyword,
          },
        },
      },
    };

    const response = await this.client.search({
      index: this.configService.get('OPEN_SEARCH_INDEX'),
      body: query,
    });
    return response;
  }

  async deleteSearch(productId: number) {
    const deleteSearchData = await this.client.delete({
      index: this.configService.get('OPEN_SEARCH_INDEX'),
      id: String(productId),
    });

    return deleteSearchData;
  }
}
