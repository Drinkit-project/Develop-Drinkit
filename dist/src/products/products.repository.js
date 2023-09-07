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
exports.ProductsRepository = void 0;
const common_1 = require("@nestjs/common");
const product_entity_1 = require("../entities/product.entity");
const typeorm_1 = require("typeorm");
let ProductsRepository = exports.ProductsRepository = class ProductsRepository extends typeorm_1.Repository {
    constructor(datasource) {
        super(product_entity_1.Product, datasource.createEntityManager());
        this.datasource = datasource;
    }
    async getById(id) {
        const product = await this.createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .leftJoinAndSelect('product.discount', 'discount')
            .leftJoinAndSelect('product.review', 'review')
            .leftJoinAndSelect('review.user', 'user')
            .select([
            'product.id',
            'product.productName',
            'category.name',
            'discount.discountPrice',
            'discount.discountRating',
            'discount.startDate',
            'discount.endDate',
            'product.description',
            'product.imgUrl',
            'product.price',
            'product.totalStock',
            'review.id',
            'review.content',
            'review.userId',
            'review.rating',
            'user.email',
        ])
            .where('product.id = :id', { id })
            .getOne();
        return product;
    }
    async getAll() {
        const product = await this.createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .leftJoinAndSelect('product.discount', 'discount')
            .select([
            'product.id',
            'product.productName',
            'category.name',
            'discount.discountPrice',
            'discount.discountRating',
            'discount.startDate',
            'discount.endDate',
            'product.description',
            'product.imgUrl',
            'product.price',
            'product.totalStock',
        ])
            .getMany();
        return product;
    }
    async getProductsByCategory(categoryId) {
        const products = await this.createQueryBuilder('product')
            .where('product.categoryId = :categoryId', { categoryId })
            .getMany();
        return products;
    }
    async updateProducts(productId, newProduct) {
        const { categoryId, productName, price, description, imgUrl, totalStock } = newProduct;
        const updatedProduct = await this.createQueryBuilder('product')
            .update()
            .set({
            productName,
            price,
            description,
            categoryId,
            imgUrl,
            totalStock,
        })
            .where('id = :productId', { productId })
            .execute();
        return updatedProduct;
    }
    async removeProducts(productId) {
        const updatedProduct = await this.createQueryBuilder('product')
            .delete()
            .where('id = :productId', { productId })
            .execute();
        return updatedProduct;
    }
};
exports.ProductsRepository = ProductsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ProductsRepository);
//# sourceMappingURL=products.repository.js.map