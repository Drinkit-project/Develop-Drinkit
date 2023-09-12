'use strict';
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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const paymentLogs_repository_1 = require("./paymentLogs.repository");
const paymentDetails_repository_1 = require("./paymentDetails.repository");
const store_product_repository_1 = require("../stores/store_product.repository");
const stores_repository_1 = require("../stores/stores.repository");
const products_repository_1 = require("../products/products.repository");
const product_entity_1 = require("../entities/product.entity");
const user_entity_1 = require("../entities/user.entity");
const store_product_entity_1 = require("../entities/store_product.entity");
const paymentLog_entity_1 = require("../entities/paymentLog.entity");
const typeorm_1 = require("typeorm");
const axios_1 = require("axios");
let OrdersService = exports.OrdersService = class OrdersService {
    constructor(dataSource, paymentLogsRepository, paymentDetailsRepository, store_ProductsRepository, storesRepository, productsRepository) {
        this.dataSource = dataSource;
        this.paymentLogsRepository = paymentLogsRepository;
        this.paymentDetailsRepository = paymentDetailsRepository;
        this.store_ProductsRepository = store_ProductsRepository;
        this.storesRepository = storesRepository;
        this.productsRepository = productsRepository;
    }
    async getOrders(userId) {
        const getOrdersData = await this.paymentLogsRepository.getOrders(userId);
        return getOrdersData;
    }
    async getOrdersDetail(paymentLogId) {
        const getOrdersDetailData = await this.paymentDetailsRepository.getOrdersDetail(paymentLogId);
        return getOrdersDetailData;
    }
    async getStore(storeId) {
        const getStoreData = await this.storesRepository
            .createQueryBuilder('store')
            .where('store.id = :storeId', { storeId })
            .getOne();
        return getStoreData;
    }
    async getStoreOrders(userId, storeId) {
        const getStoreData = await this.getStore(storeId);
        if (getStoreData.userId != userId) {
            throw new common_1.PreconditionFailedException();
        }
        const getStoreOrdersData = await this.paymentLogsRepository.getStoreOrders(storeId);
        return getStoreOrdersData;
    }
    async getAdminOrders() {
        const getAdminOrdersData = await this.paymentLogsRepository.getAdminOrders();
        return getAdminOrdersData;
    }
    async updateOrdersStatusByStore(userId, paymentLogId) {
        const getPaymentLogData = await this.paymentLogsRepository.getPaymentLog(paymentLogId);
        const getStoreData = await this.getStore(getPaymentLogData.storeId);
        if (getStoreData.userId != userId) {
            throw new common_1.PreconditionFailedException('권한이 없습니다.');
        }
        let status;
        if (getPaymentLogData.status == paymentLog_entity_1.PaymentStatus.ORDER_PENDING) {
            status = paymentLog_entity_1.PaymentStatus.READY;
        }
        else if (getPaymentLogData.status == paymentLog_entity_1.PaymentStatus.READY) {
            status = paymentLog_entity_1.PaymentStatus.READY_COMPLETE;
        }
        else if (getPaymentLogData.status == paymentLog_entity_1.PaymentStatus.READY_COMPLETE) {
            status = paymentLog_entity_1.PaymentStatus.PICKUP;
        }
        else if (getPaymentLogData.status == paymentLog_entity_1.PaymentStatus.PICKUP) {
            status = paymentLog_entity_1.PaymentStatus.COMPLETE;
        }
        const updateOrdersStatusByStoreData = await this.paymentLogsRepository.updateOrdersStatus(paymentLogId, status);
        return updateOrdersStatusByStoreData;
    }
    async updateOrdersStatusByAdmin(paymentLogId) {
        const getPaymentLogData = await this.paymentLogsRepository.getPaymentLog(paymentLogId);
        if (getPaymentLogData.storeId != 1) {
            throw new common_1.PreconditionFailedException('권한이 없습니다.');
        }
        let status;
        if (getPaymentLogData.status == paymentLog_entity_1.PaymentStatus.ORDER_PENDING) {
            status = paymentLog_entity_1.PaymentStatus.READY;
        }
        else if (getPaymentLogData.status == paymentLog_entity_1.PaymentStatus.READY) {
            status = paymentLog_entity_1.PaymentStatus.READY_COMPLETE;
        }
        else if (getPaymentLogData.status == paymentLog_entity_1.PaymentStatus.READY_COMPLETE) {
            status = paymentLog_entity_1.PaymentStatus.DELIVERY;
        }
        else if (getPaymentLogData.status == paymentLog_entity_1.PaymentStatus.DELIVERY) {
            status = paymentLog_entity_1.PaymentStatus.COMPLETE;
        }
        const updateOrdersStatusByStoreData = await this.paymentLogsRepository.updateOrdersStatus(paymentLogId, status);
        return updateOrdersStatusByStoreData;
    }
    async addPoint(userId, point, impUid) {
        try {
            await this.dataSource.transaction(async (manager) => {
                await this.paymentLogsRepository.postPaymentLog(userId, point, 1, 0, manager, impUid, paymentLog_entity_1.PaymentStatus.COMPLETE);
                const addPointData = await manager
                    .createQueryBuilder()
                    .update(user_entity_1.User)
                    .set({ point: () => `point + ${point}` })
                    .where('id = :userId', { userId })
                    .execute();
                return addPointData;
            });
        }
        catch (err) {
            console.log(err);
            await this.refund(impUid);
            return '서버오류 - 결제에 대한 환불처리가 완료 되었습니다.';
        }
    }
    async refund(imp_uid) {
        const getToken = await (0, axios_1.default)({
            url: 'https://api.iamport.kr/users/getToken',
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            data: {
                imp_key: process.env.IAMPORT_API_KEY,
                imp_secret: process.env.IAMPORY_SECRET_API_KEY,
            },
        });
        const access_token = getToken.data.response.access_token;
        const getPaymentData = await (0, axios_1.default)({
            url: `https://api.iamport.kr/payments/${imp_uid}`,
            method: 'get',
            headers: { Authorization: access_token },
        });
        const paymentData = getPaymentData.data.response;
        return paymentData;
    }
    async checkOrderList(orderList, userId, paidPoint, storeId, point) {
        const productIdList = [];
        const countList = [];
        orderList.forEach((v) => {
            productIdList.push(v.productId);
            countList.push(v.count);
        });
        if (storeId != 1) {
            const totalStockByStoreProductData = await this.store_ProductsRepository
                .createQueryBuilder('store_product')
                .where('store_product.productId IN (:...ids)', { ids: productIdList })
                .andWhere('store_product.storeId = :storeId', { storeId })
                .orderBy('store_product.productId', 'ASC')
                .getMany();
            totalStockByStoreProductData.forEach((v, i) => {
                if (countList[i] > v.storeStock) {
                    throw new common_1.PreconditionFailedException();
                }
            });
        }
        else {
            const totalStockByProductData = await this.productsRepository
                .createQueryBuilder('product')
                .where('product.id IN (:...ids)', { ids: productIdList })
                .orderBy('product.id', 'ASC')
                .getMany();
            totalStockByProductData.forEach((v, i) => {
                if (countList[i] > v.totalStock) {
                    throw new common_1.PreconditionFailedException(`상품의 재고 수량이 부족합니다.`);
                }
            });
        }
        if (paidPoint < point) {
            return '포인트 보유량이 사용 포인트보다 적습니다.';
        }
        return true;
    }
    async postOrder(userId, paidPoint, totalPrice, orderList, storeId, impUid, address) {
        try {
            const productIdList = [];
            const rankList = [];
            const countList = [];
            orderList.forEach((v) => {
                productIdList.push(v.productId);
                countList.push(v.count);
                rankList.push(String(v.productId), v.count);
            });
            if (storeId != 1) {
                const totalStockByStoreProductData = await this.store_ProductsRepository
                    .createQueryBuilder('store_product')
                    .where('store_product.storeId = :storeId', { storeId })
                    .andWhere('store_product.productId IN (:...ids)', {
                    ids: productIdList,
                })
                    .orderBy('store_product.productId', 'ASC')
                    .getMany();
                totalStockByStoreProductData.forEach((v, i) => {
                    if (countList[i] > v.storeStock) {
                        throw new common_1.PreconditionFailedException();
                    }
                });
            }
            else {
                const totalStockByProductData = await this.productsRepository
                    .createQueryBuilder('product')
                    .where('product.id IN (:...ids)', { ids: productIdList })
                    .orderBy('product.id', 'ASC')
                    .getMany();
                totalStockByProductData.forEach((v, i) => {
                    if (countList[i] > v.totalStock) {
                        throw new common_1.PreconditionFailedException(`상품의 재고 수량이 부족합니다.`);
                    }
                });
            }
            await this.dataSource.transaction(async (manager) => {
                const postPaymentLogData = await this.paymentLogsRepository.postPaymentLog(userId, totalPrice, storeId, paidPoint, manager, impUid, address);
                const paymentLogId = postPaymentLogData.identifiers[0].id;
                const paymentDetailArray = [];
                orderList.forEach((v) => {
                    paymentDetailArray.push({
                        productId: v.productId,
                        paymentLogId,
                        count: v.count,
                    });
                });
                await this.paymentDetailsRepository.postPaymentDetail(paymentDetailArray, manager);
                const addPoint = totalPrice * 0.05 - paidPoint;
                await manager
                    .createQueryBuilder()
                    .update(user_entity_1.User)
                    .set({ point: () => `point + ${addPoint}` })
                    .where('id = :id', { id: userId })
                    .execute();
                if (storeId != 1) {
                    const getStoreProductsData = await this.store_ProductsRepository
                        .createQueryBuilder('store_product')
                        .where('store_product.storeId = :storeId', { storeId })
                        .andWhere('store_product.productId IN (:...ids)', {
                        ids: productIdList,
                    })
                        .getMany();
                    for (let i = 0; i < countList.length; i++) {
                        getStoreProductsData[i].storeStock =
                            Number(getStoreProductsData[i].storeStock) - Number(countList[i]);
                    }
                    await manager
                        .createQueryBuilder()
                        .insert()
                        .into(store_product_entity_1.Store_Product, ['id', 'storeId', 'storeStock', 'productId'])
                        .values(getStoreProductsData)
                        .orUpdate(['storeStock'], ['id'], {
                        skipUpdateIfNoValuesChanged: true,
                    })
                        .execute();
                }
                else {
                    const getProductsData = await this.productsRepository
                        .createQueryBuilder('product')
                        .where('product.id IN (:...ids)', { ids: productIdList })
                        .getMany();
                    for (let i = 0; i < countList.length; i++) {
                        getProductsData[i].totalStock =
                            Number(getProductsData[i].totalStock) - Number(countList[i]);
                    }
                    await manager
                        .createQueryBuilder()
                        .insert()
                        .into(product_entity_1.Product, [
                        'id',
                        'price',
                        'productName',
                        'categoryId',
                        'description',
                        'imgUrl',
                        'totalStock',
                    ])
                        .values(getProductsData)
                        .orUpdate(['totalStock'], ['id'], {
                        skipUpdateIfNoValuesChanged: true,
                    })
                        .execute();
                }
                return '결제 완료';
            });
        }
        catch (err) {
            console.log(err);
            await this.refund(impUid);
            return '서버오류 - 결제에 대한 환불처리가 완료 되었습니다.';
        }
    }
    async requestCancelOrder(userId, paymentLogId) {
        const getPaymentLogData = await this.paymentLogsRepository.getPaymentLog(paymentLogId);
        if (getPaymentLogData.userId != userId) {
            throw new common_1.PreconditionFailedException('권한이 없습니다.');
        }
        if (getPaymentLogData.status == paymentLog_entity_1.PaymentStatus.WAIT_CANCELL) {
            throw new common_1.NotFoundException('이미 처리된 요청입니다.');
        }
        const requestCancelOrderData = await this.paymentLogsRepository.updateOrdersStatus(paymentLogId, paymentLog_entity_1.PaymentStatus.WAIT_CANCELL);
        return requestCancelOrderData;
    }
    async cancelOrderByCustomer(userId, paymentLogId, isAdmin) {
        const getPaymentLogData = await this.paymentLogsRepository.getPaymentLog(paymentLogId);
        if (getPaymentLogData.status != paymentLog_entity_1.PaymentStatus.WAIT_CANCELL) {
            throw new common_1.PreconditionFailedException('권한이 없습니다.');
        }
        const getPaymentDetailsData = await this.paymentDetailsRepository.getPaymentDetails(paymentLogId);
        if (getPaymentLogData.storeId != 1) {
            const getStoreData = await this.storesRepository
                .createQueryBuilder('store')
                .where('store.userId = :userId', { userId })
                .getOne();
            if (getPaymentLogData.storeId != Number(getStoreData.id)) {
                throw new common_1.PreconditionFailedException('권한이 없습니다.');
            }
        }
        else {
            if (isAdmin != true) {
                throw new common_1.PreconditionFailedException('권한이 없습니다.');
            }
        }
        const productIdList = [];
        const countList = [];
        getPaymentDetailsData.forEach((v) => {
            productIdList.push(v.productId);
            countList.push(v.count);
        });
        const addPoint = getPaymentLogData.paidPoint - getPaymentLogData.totalPrice * 0.05;
        await this.dataSource.transaction(async (manager) => {
            if (getPaymentLogData.storeId != 1) {
                const getStoreProductsData = await this.store_ProductsRepository
                    .createQueryBuilder('store_product')
                    .where('store_product.storeId = :storeId', {
                    storeId: getPaymentLogData.storeId,
                })
                    .andWhere('store_product.productId IN (:...ids)', {
                    ids: productIdList,
                })
                    .getMany();
                for (let i = 0; i < countList.length; i++) {
                    getStoreProductsData[i].storeStock =
                        Number(getStoreProductsData[i].storeStock) + Number(countList[i]);
                }
                await manager
                    .createQueryBuilder()
                    .insert()
                    .into(store_product_entity_1.Store_Product, ['id', 'storeId', 'storeStock', 'productId'])
                    .values(getStoreProductsData)
                    .orUpdate(['storeStock'], ['id'], {
                    skipUpdateIfNoValuesChanged: true,
                })
                    .execute();
            }
            else {
                const getProductsData = await this.productsRepository
                    .createQueryBuilder('product')
                    .where('product.id IN (:...ids)', { ids: productIdList })
                    .getMany();
                for (let i = 0; i < countList.length; i++) {
                    getProductsData[i].totalStock =
                        Number(getProductsData[i].totalStock) + Number(countList[i]);
                }
                await manager
                    .createQueryBuilder()
                    .insert()
                    .into(product_entity_1.Product, [
                    'id',
                    'price',
                    'productName',
                    'categoryId',
                    'description',
                    'imgUrl',
                    'totalStock',
                ])
                    .values(getProductsData)
                    .orUpdate(['totalStock'], ['id'], {
                    skipUpdateIfNoValuesChanged: true,
                })
                    .execute();
            }
            await manager
                .createQueryBuilder()
                .update(user_entity_1.User)
                .set({ point: () => `point + ${addPoint}` })
                .where('id = :id', { id: userId })
                .execute();
            await this.paymentDetailsRepository.deletePaymentDetails(paymentLogId, manager);
            await this.paymentLogsRepository.deletePaymentLog(paymentLogId, manager);
            const refundData = await this.refund(getPaymentLogData.impUid);
            console.log('결제 취소!!', refundData);
            return '환불 / 반품 요청이 완료되었습니다.';
        });
    }
    async cancelOrderByStore(userId, paymentLogId, storeId) {
        const getPaymentLogData = await this.paymentLogsRepository.getPaymentLog(paymentLogId);
        if (getPaymentLogData.storeId != storeId) {
            throw new common_1.PreconditionFailedException('권한이 없습니다.');
        }
        const getStoreData = await this.storesRepository
            .createQueryBuilder('store')
            .where('store.userId = :userId', { userId })
            .getOne();
        if (getStoreData.id != storeId) {
            throw new common_1.PreconditionFailedException('권한이 없습니다.');
        }
        const getPaymentDetailsData = await this.paymentDetailsRepository.getPaymentDetails(paymentLogId);
        const productIdList = [];
        const countList = [];
        getPaymentDetailsData.forEach((v) => {
            productIdList.push(v.productId);
            countList.push(v.count);
        });
        const addPoint = getPaymentLogData.paidPoint - getPaymentLogData.totalPrice * 0.05;
        const getStoreProductsData = await this.store_ProductsRepository
            .createQueryBuilder('store_product')
            .where('store_product.storeId = :storeId', { storeId })
            .andWhere('store_product.productId IN (:...ids)', { ids: productIdList })
            .getMany();
        for (let i = 0; i < countList.length; i++) {
            getStoreProductsData[i].storeStock =
                Number(getStoreProductsData[i].storeStock) + Number(countList[i]);
        }
        await this.dataSource.transaction(async (manager) => {
            await manager
                .createQueryBuilder()
                .insert()
                .into(store_product_entity_1.Store_Product, ['id', 'storeId', 'storeStock', 'productId'])
                .values(getStoreProductsData)
                .orUpdate(['storeStock'], ['id'], {
                skipUpdateIfNoValuesChanged: true,
            })
                .execute();
            await manager
                .createQueryBuilder()
                .update(user_entity_1.User)
                .set({ point: () => `point + ${addPoint}` })
                .where('id = :id', { id: getPaymentLogData.userId })
                .execute();
            await this.paymentDetailsRepository.deletePaymentDetails(paymentLogId, manager);
            await this.paymentLogsRepository.deletePaymentLog(paymentLogId, manager);
            const refundData = await this.refund(getPaymentLogData.impUid);
            console.log('결제 취소!!', refundData);
            return '주문이 취소되었습니다.';
        });
    }
    async cancelOrderByAdmin(paymentLogId) {
        const getPaymentLogData = await this.paymentLogsRepository.getPaymentLog(paymentLogId);
        if (getPaymentLogData.storeId != 1) {
            throw new common_1.PreconditionFailedException('권한이 없습니다.');
        }
        const getPaymentDetailsData = await this.paymentDetailsRepository.getPaymentDetails(paymentLogId);
        const productIdList = [];
        const countList = [];
        getPaymentDetailsData.forEach((v) => {
            productIdList.push(v.productId);
            countList.push(v.count);
        });
        const addPoint = getPaymentLogData.paidPoint - getPaymentLogData.totalPrice * 0.05;
        const getProductsData = await this.productsRepository
            .createQueryBuilder('product')
            .where('product.id IN (:...ids)', { ids: productIdList })
            .getMany();
        for (let i = 0; i < countList.length; i++) {
            getProductsData[i].totalStock =
                Number(getProductsData[i].totalStock) + Number(countList[i]);
        }
        await this.dataSource.transaction(async (manager) => {
            await manager
                .createQueryBuilder()
                .insert()
                .into(product_entity_1.Product, [
                'id',
                'price',
                'productName',
                'categoryId',
                'description',
                'imgUrl',
                'totalStock',
            ])
                .values(getProductsData)
                .orUpdate(['totalStock'], ['id'], {
                skipUpdateIfNoValuesChanged: true,
            })
                .execute();
            await manager
                .createQueryBuilder()
                .update(user_entity_1.User)
                .set({ point: () => `point + ${addPoint}` })
                .where('id = :id', { id: getPaymentLogData.userId })
                .execute();
            await this.paymentDetailsRepository.deletePaymentDetails(paymentLogId, manager);
            await this.paymentLogsRepository.deletePaymentLog(paymentLogId, manager);
            const refundData = await this.refund(getPaymentLogData.impUid);
            console.log('결제 취소!!', refundData);
            return '주문이 취소되었습니다.';
        });
        return;
    }
};
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        paymentLogs_repository_1.PaymentLogRepository,
        paymentDetails_repository_1.PaymentDetailRepository,
        store_product_repository_1.Store_ProductRepository,
        stores_repository_1.StoresRepository,
        products_repository_1.ProductsRepository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map