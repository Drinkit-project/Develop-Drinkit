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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const category_service_1 = require("./category.service");
const create_category_DTO_1 = require("./DTO/create.category.DTO");
const jwt_guard_1 = require("../../auth/security/jwt.guard");
const user_decorators_1 = require("../../commons/decorators/user.decorators");
const user_entity_1 = require("../../entities/user.entity");
let CategoryController = exports.CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async getAllCategory() {
        const categories = await this.categoryService.getAllCategory();
        return categories;
    }
    async createCategory(body, user) {
        const result = await this.categoryService.createCategory(body);
        return result;
    }
    async removeCategory(id, user) {
        this.categoryService.deleteCategory(id);
        return;
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '카테고리 조회' }),
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getAllCategory", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorators_1.AdminUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_DTO_1.default,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Delete)(':categoryId'),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('categoryId', common_1.ParseIntPipe)),
    __param(1, (0, user_decorators_1.AdminUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "removeCategory", null);
exports.CategoryController = CategoryController = __decorate([
    (0, common_1.Controller)('category'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
//# sourceMappingURL=category.controler.js.map