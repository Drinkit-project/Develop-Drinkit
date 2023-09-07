import { DiscountsService } from './discounts.service';
import { CreateDiscountRequestDto } from './dto/discounts.request.dto';
export declare class DiscountsController {
    private discountsService;
    constructor(discountsService: DiscountsService);
    createDiscount(param: any, body: CreateDiscountRequestDto): Promise<{
        message: string;
    }>;
}
