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
exports.ReviewsRepository = void 0;
const common_1 = require("@nestjs/common");
const review_entity_1 = require("../entities/review.entity");
const typeorm_1 = require("typeorm");
let ReviewsRepository = exports.ReviewsRepository = class ReviewsRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(review_entity_1.Review, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async getByProductId(productId) {
        const reviews = await this.createQueryBuilder('review')
            .where('review.productId = :productId', { productId })
            .getMany();
        return reviews;
    }
};
exports.ReviewsRepository = ReviewsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ReviewsRepository);
//# sourceMappingURL=reviews.repository.js.map