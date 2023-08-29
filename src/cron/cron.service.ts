import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule/dist';
import { OpenSearchService } from 'src/open-search/open-search.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class CronService {
  constructor(
    private readonly openSearchService: OpenSearchService,
    private readonly productService: ProductsService,
  ) {}
  @Cron('0 */1 * * *')
  async syncSearch() {
    const getSearchAllData = await this.openSearchService.getSearchAll();
    const getProductsAllData = await this.productService.getProducts();

    const sortSearchData = getSearchAllData.sort((a, b) => a._id - b._id);
    const sortProductsData = getProductsAllData.sort((a, b) => a.id - b.id);

    const searchLength: number = sortSearchData.length;
    const productsLength: number = sortProductsData.length;
    let i = 0;
    let j = 0;
    const uploadArr: Array<{ id: number; productName: string }> = [];
    const deleteArr: Array<{ id: number }> = [];

    while (i < searchLength && j < productsLength) {
      if (sortSearchData[i]._id == sortProductsData[j].id) {
        i++;
        j++;
        continue;
      }

      if (sortSearchData[i]._id < sortProductsData[j].id) {
        deleteArr.push({ id: sortSearchData[i++]._id });
      } else {
        uploadArr.push({
          id: sortProductsData[j].id,
          productName: sortProductsData[j++].productName,
        });
      }
    }

    if (i == searchLength) {
      for (let k = j; k < productsLength; k++) {
        uploadArr.push({
          id: sortProductsData[k].id,
          productName: sortProductsData[k].productName,
        });
      }
    } else {
      for (let k = i; k < searchLength; k++) {
        deleteArr.push({ id: sortSearchData[k]._id });
      }
    }

    await this.openSearchService.uploadBulkSearch(uploadArr);
    await this.openSearchService.deleteBulkSearch(deleteArr);
    return;
  }
}
