import { IsNotEmpty, IsNumber } from 'class-validator';

export class StockDTO {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  count: number;
}

export default StockDTO;
