import { IsNumber, IsArray, IsString } from 'class-validator';

export class PostOrderReqDto {
  @IsNumber()
  readonly totalPrice: number;

  //orderList = [{productId:2, 수량:3}, ...]
  @IsArray()
  readonly orderList: Array<{
    productId: number;
    count: number;
    productName: string;
    price: number;
  }>;

  @IsString()
  readonly impUid: string;

  @IsString()
  readonly address: string;

  @IsNumber()
  readonly paidPoint: number;

  @IsNumber()
  readonly storeId: number;
}
