import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { UserInfo } from 'src/entities/redis.userInfo';
import { AddItemDTO } from './DTO/cartAddItemDTO';
import { UpdateItemDTO } from './DTO/cartUpdateItemDTO';

@Injectable()
export class CartService {
  private readonly user = 'user:';
  constructor(
    @Inject(CACHE_MANAGER) private cache: Cache, // private readonly userRepository : UserRepository
  ) {}

  async getCart(id: number) {
    const userId = this.user + id;
    const cart = await this.cache.store.get<Pick<UserInfo, 'products'>>(userId);

    if (!cart) throw new NotFoundException('There is no Cart on redis.');

    return cart;
  }

  async addItemOnCart(id: number, data: AddItemDTO) {
    const userId = this.user + id;
    const cart = await this.cache.store.get<UserInfo>(userId);
    cart.products.push(data);
    await this.cache.set(userId, cart);

    return { message: 'cart add on product successfully' };
  }

  async registCartOnRedis(id: number) {
    const userId = this.user + id;
    const token = 'refreshToken by Hard Coding';

    const obj: UserInfo = {
      refreshToken: token,
      products: [],
    };

    await this.cache.set(userId, obj);
    return { message: 'Regist cart on redis successfully' };
  }

  async updateItemOnCart(id: number, productId: number, data: UpdateItemDTO) {
    const userId = this.user + id;
    const cart = await this.cache.store.get<UserInfo>(userId);

    cart.products.forEach((item) => {
      if (item.product.id === productId)
        data.upDown === true
          ? (item.quantity += data.quantity)
          : (item.quantity = data.quantity);
    });

    await this.cache.set(userId, cart);
    return { message: 'update item quantity successfully' };
  }

  async deleteItemOnCart(id: number, productId: number) {
    const userId = this.user + id;
    const cart = await this.cache.store.get<UserInfo>(userId);
    let idxOfProduct: number;
    cart.products.filter((item, idx) => {
      if (item.product.id === productId) idxOfProduct = idx;
    });

    if (!idxOfProduct)
      throw new NotFoundException('There is no Product in cart');

    cart.products.splice(idxOfProduct, 1);

    await this.cache.set(userId, cart);
    return { message: 'delete item on cart successfully' };
  }

  async deleteCartOnRedis(id: number) {
    const userId = this.user + id;
    await this.cache.del(userId);
    return { message: 'delete cart on Redis successfully' };
  }
}
