import { Discount } from 'src/entities/discout.entity';
declare const CreateDiscountRequestDto_base: import("@nestjs/common").Type<Omit<Discount, "discountPrice" | "discountRating" | "startDate" | "endDate">>;
export declare class CreateDiscountRequestDto extends CreateDiscountRequestDto_base {
}
export {};
