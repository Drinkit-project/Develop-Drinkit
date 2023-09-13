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
exports.StoresController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const stores_service_1 = require("./stores.service");
const user_decorators_1 = require("../commons/decorators/user.decorators");
const jwt_guard_1 = require("../auth/security/jwt.guard");
const user_entity_1 = require("../entities/user.entity");
const create_DTO_1 = require("./DTO/create.DTO");
const update_DTO_1 = require("./DTO/update.DTO");
const platform_express_1 = require("@nestjs/platform-express");
const store_request_interceptors_1 = require("../commons/interceptors/store.request.interceptors");
let StoresController = exports.StoresController = class StoresController {
    constructor(storeService) {
        this.storeService = storeService;
    }
    async getStores(data) {
        try {
            const result = await this.storeService.getStores(data);
            return result;
        }
        catch (error) {
            throw new common_1.NotFoundException('There is no Store in DB');
        }
    }
    async getStoreDetail(id) {
        try {
            const result = await this.storeService.getStoreDetail(id);
            return result;
        }
        catch (e) {
            throw new common_1.NotFoundException('There is no Store in DB');
        }
    }
    async getMystore(userId) {
        try {
            const result = await this.storeService.getMystore(userId);
            return result;
        }
        catch (e) {
            throw new common_1.NotFoundException('There is no Store in DB');
        }
    }
    async createStore(file, user, body) {
        try {
            const result = await this.storeService.createStore(body, user.id);
            return result;
        }
        catch (e) {
            throw new common_1.BadRequestException('error => ' + e.message);
        }
    }
    updateStroe(id, user, body) {
        try {
            const result = this.storeService.updateStore(id, user, body);
            if (result) {
                return { message: '성공적으로 업데이트되었습니다.' };
            }
            else {
                throw new common_1.BadRequestException('업데이트에 실패했습니다.');
            }
        }
        catch (e) {
            throw new common_1.BadRequestException('Please try again..');
        }
    }
    async deleteStore(id, user) {
        try {
            const result = await this.storeService.deleteStore(id, user);
            if (result) {
                return { message: '성공적으로 삭제되었습니다.' };
            }
            else {
                throw new common_1.BadRequestException('삭제에 실패했습니다.');
            }
        }
        catch (e) {
            throw new common_1.BadRequestException('Please try again..');
        }
    }
    async getProductDetailInProductList(storeId, productId) {
        try {
            const result = await this.storeService.getProductDetailByStoreIdAndProductId(storeId, productId);
            return result;
        }
        catch (e) {
            throw new common_1.NotFoundException('There is no Product in List');
        }
    }
    async addProductOnStore(user, body) {
        try {
            const result = await this.storeService.addProductOnStore(user, body);
            return result;
        }
        catch (e) {
            throw new common_1.BadRequestException('error => ' + e.message);
        }
    }
    async updateProductStock(body, id) {
        try {
            const result = await this.storeService.updateProductStock(body, id);
            if (result === 1) {
                return { message: '재고 변경 완료' };
            }
            else if (result === 0) {
                return { message: '재고 변경 실패' };
            }
        }
        catch (e) {
            throw new common_1.BadRequestException('update to fail..');
        }
    }
    async deleteProductInList(storeId, productId) {
        try {
            const result = await this.storeService.deleteProductInList(storeId, productId);
            if (result === 1) {
                return { message: '상품 삭제 완료' };
            }
            else if (result === 0) {
                return { message: '상품 삭제 실패' };
            }
        }
        catch (e) {
            throw new common_1.BadRequestException('delete to fail..');
        }
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get Store by stock',
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "getStores", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get Store detail by storeId',
        parameters: [{ name: 'storeId', in: 'path' }],
    }),
    (0, common_1.Get)('/:storeId'),
    __param(0, (0, common_1.Param)('storeId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "getStoreDetail", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get Store detail by storeId',
        parameters: [{ name: 'storeId', in: 'path' }],
    }),
    (0, common_1.Get)('/user/mystore'),
    __param(0, (0, user_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "getMystore", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Create Store',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'created',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request',
    }),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)(store_request_interceptors_1.TransformBodyInterceptor),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, common_1.Post)(),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, user_decorators_1.AdminUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User,
        create_DTO_1.CreateStoreDTO]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "createStore", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Update Store detail by storeId',
        parameters: [{ name: 'storeId', in: 'path' }],
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'OK',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request',
    }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Patch)('/:storeId'),
    __param(0, (0, common_1.Param)('storeId', common_1.ParseIntPipe)),
    __param(1, (0, user_decorators_1.PersonalUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User,
        update_DTO_1.UpdateStoreDTO]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "updateStroe", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Delete Store by storeId',
        parameters: [{ name: 'storeId', in: 'path' }],
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'OK',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request',
    }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Delete)('/:storeId'),
    __param(0, (0, common_1.Param)('storeId', common_1.ParseIntPipe)),
    __param(1, (0, user_decorators_1.PersonalUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "deleteStore", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get Product detail in store product list',
        parameters: [
            { name: 'storeId', in: 'path' },
            { name: 'productId', in: 'path' },
        ],
    }),
    (0, common_1.Get)('/:storeId/:productId'),
    __param(0, (0, common_1.Param)('storeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "getProductDetailInProductList", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Add product on Store',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'created',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request',
    }),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Post)('/products'),
    __param(0, (0, user_decorators_1.PersonalUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        create_DTO_1.AddProductDTO]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "addProductOnStore", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Update product stock',
        parameters: [{ name: 'storeId', in: 'path' }],
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'OK',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request',
    }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Patch)('/products/:productId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_DTO_1.UpdateProductDTO, Number]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "updateProductStock", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Delete Store by storeId and productId',
        parameters: [
            { name: 'storeId', in: 'path' },
            { name: 'productId', in: 'path' },
        ],
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'OK',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request',
    }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Delete)('/:storeId/:productId'),
    __param(0, (0, common_1.Param)('storeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "deleteProductInList", null);
exports.StoresController = StoresController = __decorate([
    (0, swagger_1.ApiTags)('Store'),
    (0, common_1.Controller)('stores'),
    __metadata("design:paramtypes", [stores_service_1.StoresService])
], StoresController);
//# sourceMappingURL=stores.controller.js.map