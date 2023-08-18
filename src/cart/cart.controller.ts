import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  @Get('/hi')
  async sayHiFromCache() {
    const result = await this.cache.get('data');
    console.log(await this.cache.store.keys('*'));
    if (result) {
      console.log('Found data in Cache');

      return result;
    } else {
      const fetchedData = await fetch('https://reqres.in/api/users?page=2', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((d) => d.json());
      console.log(fetchedData);
      this.cache.store;
      console.log('There is no data in Cache');
      this.cache.set('data', fetchedData);
      return fetchedData;
    }
  }
}
