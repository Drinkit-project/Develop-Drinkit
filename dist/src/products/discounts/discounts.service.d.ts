import { DiscountsRepository } from './discounts.repository';
export declare class DiscountsService {
    private discountsRepository;
    constructor(discountsRepository: DiscountsRepository);
    createDiscount(productId: any, newDiscount: any): Promise<void>;
}
