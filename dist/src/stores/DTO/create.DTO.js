"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProductDTO = exports.CreateStoreDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const store_entity_1 = require("../../entities/store.entity");
const store_product_entity_1 = require("../../entities/store_product.entity");
class CreateStoreDTO extends (0, swagger_1.PickType)(store_entity_1.Store, [
    'address',
    'name',
    'description',
    'businessLicense',
    'imgUrls',
    'lat',
    'lng',
]) {
}
exports.CreateStoreDTO = CreateStoreDTO;
class AddProductDTO extends (0, swagger_1.PickType)(store_product_entity_1.Store_Product, [
    'productId',
    'storeId',
    'storeStock',
]) {
}
exports.AddProductDTO = AddProductDTO;
//# sourceMappingURL=create.DTO.js.map