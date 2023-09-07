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
exports.PaymentDetailRepository = void 0;
const common_1 = require("@nestjs/common");
const paymentDetail_entity_1 = require("../entities/paymentDetail.entity");
const product_entity_1 = require("../entities/product.entity");
const typeorm_1 = require("typeorm");
let PaymentDetailRepository = exports.PaymentDetailRepository = class PaymentDetailRepository extends typeorm_1.Repository {
    constructor(datasource) {
        super(paymentDetail_entity_1.PaymentDetail, datasource.createEntityManager());
        this.datasource = datasource;
    }
    async getOrdersDetail(paymentLogId) {
        const getOrdersDetailData = await this.createQueryBuilder('paymentDetail')
            .leftJoinAndSelect(product_entity_1.Product, 'product', 'product.id = paymentDetail.productId')
            .where('paymentDetail.paymentLogId = :paymentLogId', { paymentLogId })
            .getRawMany();
        return getOrdersDetailData;
    }
    async getPaymentDetails(paymentLogId) {
        const getOrdersDetailData = await this.createQueryBuilder('paymentDetail')
            .where('paymentDetail.paymentLogId = :paymentLogId', { paymentLogId })
            .getMany();
        return getOrdersDetailData;
    }
    async postPaymentDetail(paymentDetailArray, manager) {
        const postPaymentDetailData = await manager
            .createQueryBuilder()
            .insert()
            .into(paymentDetail_entity_1.PaymentDetail)
            .values(paymentDetailArray)
            .execute();
        return postPaymentDetailData;
    }
    async deletePaymentDetails(paymentLogId, manager) {
        const deletePaymentDetailsData = await manager
            .createQueryBuilder()
            .delete()
            .from(paymentDetail_entity_1.PaymentDetail)
            .where('paymentLogId = :paymentLogId', { paymentLogId })
            .execute();
        return deletePaymentDetailsData;
    }
};
exports.PaymentDetailRepository = PaymentDetailRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], PaymentDetailRepository);
//# sourceMappingURL=paymentDetails.repository.js.map