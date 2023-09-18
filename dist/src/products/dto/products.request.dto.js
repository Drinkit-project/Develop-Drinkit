"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductsRequestDto = exports.CreateProductsRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const product_entity_1 = require("../../entities/product.entity");
class CreateProductsRequestDto extends (0, swagger_1.PickType)(product_entity_1.Product, [
    'price',
    'productName',
    'description',
    'categoryId',
    'imgUrl',
    'totalStock',
]) {
}
exports.CreateProductsRequestDto = CreateProductsRequestDto;
class UpdateProductsRequestDto extends (0, swagger_1.OmitType)(product_entity_1.Product, [
    'price',
    'productName',
    'description',
    'categoryId',
    'imgUrl',
    'totalStock',
]) {
}
exports.UpdateProductsRequestDto = UpdateProductsRequestDto;
//# sourceMappingURL=products.request.dto.js.map