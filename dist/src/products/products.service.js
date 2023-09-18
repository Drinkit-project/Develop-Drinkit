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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const products_repository_1 = require("./products.repository");
const open_search_service_1 = require("../open-search/open-search.service");
let ProductsService = exports.ProductsService = class ProductsService {
    constructor(productsRepository, openSearchService) {
        this.productsRepository = productsRepository;
        this.openSearchService = openSearchService;
    }
    async getProducts() {
        const products = await this.productsRepository.getAll();
        return products;
    }
    async getProductsByCategory(categoryId) {
        const products = await this.productsRepository.getProductsByCategory(categoryId);
        return products;
    }
    async getProductsById(id) {
        const products = await this.productsRepository.getById(id);
        if (!products) {
            throw new common_1.NotFoundException('해당 상품을 조회할 수 없습니다.');
        }
        return products;
    }
    async createProducts(newProduct) {
        const { categoryId, productName, price, description, imgUrl, totalStock } = newProduct;
        try {
            const createdProduct = await this.productsRepository.insert({
                categoryId: parseInt(categoryId),
                productName,
                price,
                description,
                imgUrl,
                totalStock,
            });
            await this.openSearchService.uploadSearch(createdProduct.identifiers[0].id, productName);
            return createdProduct;
        }
        catch (error) {
            throw new common_1.BadGatewayException(`서버에러 messege: ${error}`);
        }
    }
    async updateProducts(productId, newProduct) {
        const updatedProduct = await this.productsRepository.updateProducts(productId, newProduct);
        await this.openSearchService.deleteSearch(productId);
        await this.openSearchService.uploadSearch(productId, newProduct.productName);
        return updatedProduct;
    }
    async removeProducts(productId) {
        const removedProduct = await this.productsRepository.removeProducts(productId);
        await this.openSearchService.deleteSearch(productId);
        return removedProduct;
    }
};
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [products_repository_1.ProductsRepository,
        open_search_service_1.OpenSearchService])
], ProductsService);
//# sourceMappingURL=products.service.js.map