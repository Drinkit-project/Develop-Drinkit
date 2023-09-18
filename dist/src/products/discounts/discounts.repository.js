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
exports.DiscountsRepository = void 0;
const common_1 = require("@nestjs/common");
const discout_entity_1 = require("../../entities/discout.entity");
const typeorm_1 = require("typeorm");
let DiscountsRepository = exports.DiscountsRepository = class DiscountsRepository extends typeorm_1.Repository {
    constructor(datasource) {
        super(discout_entity_1.Discount, datasource.createEntityManager());
        this.datasource = datasource;
    }
    async createDiscount(productId, discountPrice, discountRating, startDate, endDate) {
        try {
            const createdDiscount = await this.createQueryBuilder()
                .insert()
                .into(discout_entity_1.Discount)
                .values({
                productId,
                discountPrice,
                discountRating,
                startDate,
                endDate,
            })
                .execute();
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.BadRequestException('이미 해당 상품에 할인이 존재합니다.');
            }
            throw new common_1.InternalServerErrorException('디비에러');
        }
    }
};
exports.DiscountsRepository = DiscountsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], DiscountsRepository);
//# sourceMappingURL=discounts.repository.js.map