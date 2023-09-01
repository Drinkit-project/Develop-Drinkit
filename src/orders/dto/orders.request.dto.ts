import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  IsJSON,
} from 'class-validator';

export class OrderReqDto {
  //orderList = [{productId:2, 수량:3}, ...]
  @IsArray()
  readonly orderList: Array<{
    productId: number;
    count: number;
    productName: string;
    price: number;
  }>;

  @IsNumber()
  readonly paidPoint: number;

  @IsNumber()
  readonly storeId: number;
}
