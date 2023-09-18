import { Discount } from 'src/entities/discout.entity';
import { DataSource, Repository } from 'typeorm';
export declare class DiscountsRepository extends Repository<Discount> {
    private datasource;
    constructor(datasource: DataSource);
    createDiscount(productId: any, discountPrice: any, discountRating: any, startDate: any, endDate: any): Promise<void>;
}
