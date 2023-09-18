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
exports.Review = void 0;
const typeorm_1 = require("typeorm");
const common_entity_1 = require("./common.entity");
const user_entity_1 = require("./user.entity");
const product_entity_1 = require("./product.entity");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const paymentDetail_entity_1 = require("./paymentDetail.entity");
var ReviewRating;
(function (ReviewRating) {
    ReviewRating[ReviewRating["ONE"] = 1] = "ONE";
    ReviewRating[ReviewRating["TWO"] = 2] = "TWO";
    ReviewRating[ReviewRating["THREE"] = 3] = "THREE";
    ReviewRating[ReviewRating["FOUR"] = 4] = "FOUR";
    ReviewRating[ReviewRating["FIVE"] = 5] = "FIVE";
})(ReviewRating || (ReviewRating = {}));
let Review = exports.Review = class Review extends common_entity_1.CommonEntity {
};
__decorate([
    (0, typeorm_1.Column)('bigint'),
    __metadata("design:type", Number)
], Review.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: '개나이잉이이이이스요',
        description: '리뷰 내용',
        required: true,
    }),
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], Review.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        example: '5',
        description: '리뷰 평점',
        required: true,
    }),
    (0, typeorm_1.Column)({ type: 'int', enum: ReviewRating }),
    __metadata("design:type", Number)
], Review.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint'),
    __metadata("design:type", Number)
], Review.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint'),
    __metadata("design:type", Number)
], Review.prototype, "paymentDetailId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.review),
    (0, typeorm_1.JoinColumn)([{ name: 'productId', referencedColumnName: 'id' }]),
    __metadata("design:type", product_entity_1.Product)
], Review.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.review),
    (0, typeorm_1.JoinColumn)([{ name: 'userId', referencedColumnName: 'id' }]),
    __metadata("design:type", user_entity_1.User)
], Review.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => paymentDetail_entity_1.PaymentDetail, (paymentDetail) => paymentDetail.review),
    (0, typeorm_1.JoinColumn)([{ name: 'paymentDetailId', referencedColumnName: 'id' }]),
    __metadata("design:type", paymentDetail_entity_1.PaymentDetail)
], Review.prototype, "paymentDetail", void 0);
exports.Review = Review = __decorate([
    (0, typeorm_1.Entity)({ schema: '', name: 'review' })
], Review);
//# sourceMappingURL=review.entity.js.map