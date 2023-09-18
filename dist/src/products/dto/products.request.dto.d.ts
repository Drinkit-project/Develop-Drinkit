import { Product } from 'src/entities/product.entity';
declare const CreateProductsRequestDto_base: import("@nestjs/common").Type<Pick<Product, "description" | "price" | "productName" | "categoryId" | "totalStock" | "imgUrl">>;
export declare class CreateProductsRequestDto extends CreateProductsRequestDto_base {
}
declare const UpdateProductsRequestDto_base: import("@nestjs/common").Type<Omit<Product, "description" | "price" | "productName" | "categoryId" | "totalStock" | "imgUrl">>;
export declare class UpdateProductsRequestDto extends UpdateProductsRequestDto_base {
}
export {};
