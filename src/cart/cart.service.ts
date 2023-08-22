import { Cart } from './Types/cart.type';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { AddItemDTO } from './DTO/cartAddItemDTO';
import { UpdateItemDTO } from './DTO/cartUpdateItemDTO';

@Injectable()
export class CartService {
  private readonly user = 'user:';
  private readonly cart = ':cart';
  constructor(
    @Inject(CACHE_MANAGER) private cache: Cache, // private readonly userRepository : UserRepository
  ) {}

  async getCart(id: string) {
    const key = this.user + id + this.cart;
    const cart = await this.cache.store.get<Cart>(key);

    if (!cart) throw new NotFoundException('There is no Cart on redis.');

    return cart;
  }

  async addItemOnCart(id: string, data: AddItemDTO) {
    const key = this.user + id + this.cart;
    const cart = await this.cache.store.get<Cart>(key);

    cart.products.push(data);

    try {
      await this.cache.set(key, cart);
      return { message: 'cart add on product successfully' };
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(
        "Redis doesn't work now. please try again a few minutes later",
      );
    }
  }

  async registCartOnRedis(id: string) {
    const key = this.user + id + this.cart;
    const value: Cart = {
      products: [],
    };

    await this.cache.set(key, value);
    return { message: 'Regist cart on redis successfully' };
  }

  async updateItemOnCart(productId: number, id: string, data: UpdateItemDTO) {
    const key = this.user + id + this.cart;
    const cart = await this.cache.store.get<Cart>(key);

    cart.products.forEach((item) => {
      if (item.product.id === productId)
        data.upDown === true
          ? (item.quantity += data.quantity)
          : (item.quantity = data.quantity);
    });

    await this.cache.set(key, cart);
    return { message: 'update item quantity successfully' };
  }

  async deleteItemOnCart(id: number, productId: number) {
    const key = this.user + id + this.cart;
    const cart = await this.cache.store.get<Cart>(key);
    let idxOfProduct: number;
    cart.products.filter((item, idx) => {
      if (item.product.id === productId) idxOfProduct = idx;
    });

    if (!idxOfProduct)
      throw new NotFoundException('There is no Product in cart');

    cart.products.splice(idxOfProduct, 1);

    await this.cache.set(key, cart);
    return { message: 'delete item on cart successfully' };
  }

  async deleteCartOnRedis(id: number) {
    const key = this.user + id + this.cart;
    await this.cache.del(key);
    return { message: 'delete cart on Redis successfully' };
  }
}
