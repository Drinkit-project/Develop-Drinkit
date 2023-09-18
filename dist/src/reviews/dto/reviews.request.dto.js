"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReviewsRequestDto = exports.CreateReviewsRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const review_entity_1 = require("../../entities/review.entity");
class CreateReviewsRequestDto extends (0, swagger_1.PickType)(review_entity_1.Review, [
    'content',
    'rating',
]) {
}
exports.CreateReviewsRequestDto = CreateReviewsRequestDto;
class UpdateReviewsRequestDto {
}
exports.UpdateReviewsRequestDto = UpdateReviewsRequestDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: '개나이잉이이이이스요',
        description: '리뷰 내용',
        required: true,
    }),
    __metadata("design:type", String)
], UpdateReviewsRequestDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        example: '5',
        description: '리뷰 평점',
        required: true,
    }),
    __metadata("design:type", Number)
], UpdateReviewsRequestDto.prototype, "rating", void 0);
//# sourceMappingURL=reviews.request.dto.js.map