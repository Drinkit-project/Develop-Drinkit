"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDiscountRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const discout_entity_1 = require("../../../entities/discout.entity");
class CreateDiscountRequestDto extends (0, swagger_1.OmitType)(discout_entity_1.Discount, [
    'discountPrice',
    'discountRating',
    'startDate',
    'endDate',
]) {
}
exports.CreateDiscountRequestDto = CreateDiscountRequestDto;
//# sourceMappingURL=discounts.request.dto.js.map