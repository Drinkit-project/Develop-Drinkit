import { IsNumber, IsArray } from 'class-validator';

export class PostOrderReqDto {
  @IsNumber()
  readonly totalPrice: number;

  //orderList = [{productId:2, 수량:3}, ...]
  @IsArray()
  readonly orderList: Array<{ productId: number; count: number }>;

  @IsNumber()
  readonly paidPoint: number;

  @IsNumber()
  readonly storeId: number;
}
