import { AddItemDTO } from 'src/cart/DTO/cartAddItemDTO';

export type UserInfo = {
  refreshToken?: string;
  products?: AddItemDTO[];
};
