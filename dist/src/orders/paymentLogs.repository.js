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
exports.PaymentLogRepository = void 0;
const common_1 = require("@nestjs/common");
const paymentLog_entity_1 = require("../entities/paymentLog.entity");
const typeorm_1 = require("typeorm");
const paymentLog_entity_2 = require("../entities/paymentLog.entity");
let PaymentLogRepository = exports.PaymentLogRepository = class PaymentLogRepository extends typeorm_1.Repository {
    constructor(datasource) {
        super(paymentLog_entity_1.PaymentLog, datasource.createEntityManager());
        this.datasource = datasource;
    }
    async getOrders(userId) {
        const getOrdersData = await this.createQueryBuilder('paymentLog')
            .where('paymentLog.userId = :userId', { userId })
            .orderBy('paymentLog.id', 'ASC')
            .getMany();
        return getOrdersData;
    }
    async getPaymentLog(paymentLogId) {
        const getPaymentLogData = await this.createQueryBuilder('paymentLog')
            .where('paymentLog.id = :paymentLogId', { paymentLogId })
            .getOne();
        return getPaymentLogData;
    }
    async getStoreOrders(storeId) {
        const getStoreOrdersData = await this.createQueryBuilder('paymentLog')
            .where('paymentLog.storeId = :storeId', { storeId })
            .getMany();
        return getStoreOrdersData;
    }
    async getAdminOrders() {
        const getAdminOrdersData = await this.createQueryBuilder('paymentLog')
            .where('paymentLog.storeId = :storeId', { storeId: 1 })
            .getMany();
        return getAdminOrdersData;
    }
    async updateOrdersStatus(paymentLogId, status) {
        const updateOrdersStatusData = await this.createQueryBuilder()
            .update(paymentLog_entity_1.PaymentLog)
            .set({ status })
            .where('id = :paymentLogId', { paymentLogId })
            .execute();
        return updateOrdersStatusData;
    }
    async postPaymentLog(userId, totalPrice, storeId, paidPoint, manager, impUid, address, status) {
        const postPaymentLogData = await manager
            .createQueryBuilder()
            .insert()
            .into(paymentLog_entity_1.PaymentLog)
            .values({
            userId,
            status: status || paymentLog_entity_2.PaymentStatus.ORDER_PENDING,
            totalPrice,
            storeId,
            paidPoint,
            impUid,
            address,
        })
            .execute();
        return postPaymentLogData;
    }
    async postPaymentLogBySubscribe(userId, totalPrice, storeId, paidPoint, manager, impUid, address, status) {
        return;
    }
    async findPaymentLog(userId) {
        const findPaymentLogData = await this.createQueryBuilder('paymentLog')
            .where('paymentLog.userId = :userId', { userId })
            .orderBy('paymentLog.createdAt', 'DESC')
            .getOne();
        return findPaymentLogData;
    }
    async deletePaymentLog(paymentLogId, manager) {
        const deletePaymentLogData = await manager
            .createQueryBuilder()
            .delete()
            .from(paymentLog_entity_1.PaymentLog)
            .where('id = :paymentLogId', { paymentLogId })
            .execute();
        return deletePaymentLogData;
    }
};
exports.PaymentLogRepository = PaymentLogRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], PaymentLogRepository);
//# sourceMappingURL=paymentLogs.repository.js.map