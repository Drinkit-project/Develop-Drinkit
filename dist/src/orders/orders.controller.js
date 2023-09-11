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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const orders_service_1 = require("./orders.service");
const orders_request_dto_1 = require("./dto/orders.request.dto");
const postOrders_request_dto_1 = require("./dto/postOrders.request.dto");
const jwt_guard_1 = require("../auth/security/jwt.guard");
const user_decorators_1 = require("../commons/decorators/user.decorators");
const addPoint_dto_1 = require("./dto/addPoint.dto");
let OrdersController = exports.OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async getOrders(user) {
        const getOrdersData = await this.ordersService.getOrders(user.id);
        return getOrdersData;
    }
    async getStoreOrders(user, storeId) {
        const getStoreOrdersData = await this.ordersService.getStoreOrders(user.id, storeId);
        return getStoreOrdersData;
    }
    async getAdminOrders(user) {
        const getAdminOrdersData = await this.ordersService.getAdminOrders();
        return getAdminOrdersData;
    }
    async getOrdersDetail(paymentLogId) {
        const getOrdersDetailData = await this.ordersService.getOrdersDetail(paymentLogId);
        return getOrdersDetailData;
    }
    async updateOrdersStatusByStore(user, paymentLogId, storeId) {
        const updateOrdersStatusByStoreData = await this.ordersService.updateOrdersStatusByStore(user.id, paymentLogId);
        return updateOrdersStatusByStoreData;
    }
    async updateOrdersStatusByAdmin(user, paymentLogId) {
        const updateOrdersStatusByAdminData = await this.ordersService.updateOrdersStatusByAdmin(paymentLogId);
        return updateOrdersStatusByAdminData;
    }
    async addPoint(user, dto) {
        const addPointData = await this.ordersService.addPoint(user.id, dto.point, dto.impUid);
        return addPointData;
    }
    async getPayInfo(imp_uid) {
        const getPayInfoData = await this.ordersService.refund(imp_uid['imp_uid']);
        return getPayInfoData;
    }
    async order(user, dto) {
        const checkOrderListData = await this.ordersService.checkOrderList(dto.orderList, user.id, dto.paidPoint, dto.storeId, user.point);
        return checkOrderListData;
    }
    async postOrder(user, dto) {
        console.log(dto);
        const postOrderData = await this.ordersService.postOrder(user.id, dto.paidPoint, dto.totalPrice, dto.orderList, dto.storeId, dto.impUid, dto.address);
        return postOrderData;
    }
    async requestCancelOrder(user, paymentLogId) {
        const requestCancelOrderData = await this.ordersService.requestCancelOrder(user.id, paymentLogId);
        return requestCancelOrderData;
    }
    async cancelOrderByCustomer(user, paymentLogId) {
        const cancelOrderByCustomerData = await this.ordersService.cancelOrderByCustomer(user.id, paymentLogId, user.isAdmin);
        return cancelOrderByCustomerData;
    }
    async cancelOrderByStore(user, paymentLogId, storeId) {
        const cancelOrderByStoreData = await this.ordersService.cancelOrderByStore(user.id, paymentLogId, storeId);
        return cancelOrderByStoreData;
    }
    async cancelOrderByAdmin(user, paymentLogId) {
        const cancelOrderByAdminData = await this.ordersService.cancelOrderByAdmin(paymentLogId);
        return cancelOrderByAdminData;
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '유저 주문 내역 조회' }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, user_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getOrders", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '가게 주문 내역 조회' }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Get)('/store/:storeId'),
    __param(0, (0, user_decorators_1.PersonalUser)()),
    __param(1, (0, common_1.Param)('storeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getStoreOrders", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '쇼핑몰 관리자 주문 내역 조회' }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Get)('/Admin'),
    __param(0, (0, user_decorators_1.AdminUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getAdminOrders", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '주문 내역 상세 조회' }),
    (0, common_1.Get)(':paymentLogId'),
    __param(0, (0, common_1.Param)('paymentLogId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getOrdersDetail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '업주 주문 상태 변경' }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Put)(':paymentLogId/Store/:storeId'),
    __param(0, (0, user_decorators_1.PersonalUser)()),
    __param(1, (0, common_1.Param)('paymentLogId')),
    __param(2, (0, common_1.Param)('storeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "updateOrdersStatusByStore", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '쇼핑몰 관리자 주문 상태 변경' }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Put)(':paymentLogId/Admin'),
    __param(0, (0, user_decorators_1.AdminUser)()),
    __param(1, (0, common_1.Param)('paymentLogId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "updateOrdersStatusByAdmin", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '포인트 충전 - iamport' }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Put)('/addPoint'),
    __param(0, (0, user_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, addPoint_dto_1.addPointDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "addPoint", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '환불 - iamport' }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Post)('/refund'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getPayInfo", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '주문 요청 - iamport' }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, user_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, orders_request_dto_1.OrderReqDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "order", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '결제 성공 후 - iamport' }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Post)('postOrder'),
    __param(0, (0, user_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, postOrders_request_dto_1.PostOrderReqDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "postOrder", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '고객 주문 취소 요청' }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Delete)(':paymentLogId'),
    __param(0, (0, user_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('paymentLogId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "requestCancelOrder", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '고객 주문 취소 완료' }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Delete)(':paymentLogId/Ok'),
    __param(0, (0, user_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('paymentLogId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "cancelOrderByCustomer", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '가게 주문 취소' }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Delete)(':paymentLogId/store/:storeId'),
    __param(0, (0, user_decorators_1.PersonalUser)()),
    __param(1, (0, common_1.Param)('paymentLogId')),
    __param(2, (0, common_1.Param)('storeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "cancelOrderByStore", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '쇼핑몰 관리자 주문 취소' }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Delete)(':paymentLogId/Admin'),
    __param(0, (0, user_decorators_1.AdminUser)()),
    __param(1, (0, common_1.Param)('paymentLogId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "cancelOrderByAdmin", null);
exports.OrdersController = OrdersController = __decorate([
    (0, swagger_1.ApiTags)('orders'),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map