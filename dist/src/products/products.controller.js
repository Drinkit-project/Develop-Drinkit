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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const products_service_1 = require("./products.service");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const products_request_dto_1 = require("./dto/products.request.dto");
const user_decorators_1 = require("../commons/decorators/user.decorators");
const jwt_guard_1 = require("../auth/security/jwt.guard");
const platform_express_1 = require("@nestjs/platform-express");
const product_request_interceptor_1 = require("../commons/interceptors/product.request.interceptor");
let ProductsController = exports.ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async getProductsByCategory(categoryId) {
        if (categoryId === '0' || !categoryId) {
            const products = await this.productsService.getProducts();
            return products;
        }
        else {
            const products = await this.productsService.getProductsByCategory(categoryId);
            return products;
        }
    }
    async getProductsById(param) {
        const { productId } = param;
        const products = await this.productsService.getProductsById(productId);
        return products;
    }
    async createProducts(user, file, body) {
        const productJson = body;
        const newProduct = await this.productsService.createProducts(productJson);
        return `상품 등록 완료!`;
    }
    async updateProducts(user, param, body) {
        const { productId } = param;
        const newProduct = await this.productsService.updateProducts(productId, body);
        return '상품 수정 완료!';
    }
    async removeProducts(user, param) {
        const { productId } = param;
        const removedProduct = await this.productsService.removeProducts(productId);
        return '상품 삭제 완료!';
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '상품 카테고리 별 조회' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProductsByCategory", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '상품 상세 조회' }),
    (0, common_1.Get)('/:productId'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProductsById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '상품 등록' }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)(product_request_interceptor_1.TransformBodyInterceptor),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, common_1.Post)(),
    __param(0, (0, user_decorators_1.AdminUser)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createProducts", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '상품 수정' }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Put)('/:productId'),
    __param(0, (0, user_decorators_1.AdminUser)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, products_request_dto_1.UpdateProductsRequestDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateProducts", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '상품 삭제' }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Delete)('/:productId'),
    __param(0, (0, user_decorators_1.AdminUser)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "removeProducts", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map