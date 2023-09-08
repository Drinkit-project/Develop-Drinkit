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
exports.CronService = void 0;
const common_1 = require("@nestjs/common");
const dist_1 = require("@nestjs/schedule/dist");
const open_search_service_1 = require("../open-search/open-search.service");
const products_service_1 = require("../products/products.service");
const subscribes_repository_1 = require("../subscribes/subscribes.repository");
const users_repository_1 = require("../user/users.repository");
const paymentLog_entity_1 = require("../entities/paymentLog.entity");
const user_entity_1 = require("../entities/user.entity");
const typeorm_1 = require("typeorm");
const nodemailer = require("nodemailer");
let CronService = exports.CronService = class CronService {
    constructor(dataSource, openSearchService, productService, subscribesRepository, usersRepository) {
        this.dataSource = dataSource;
        this.openSearchService = openSearchService;
        this.productService = productService;
        this.subscribesRepository = subscribesRepository;
        this.usersRepository = usersRepository;
        this.transporter = nodemailer.createTransport({
            pool: true,
            host: process.env.NODEMAILER_EMAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_EMAIL_PASSWORD,
            },
        });
    }
    async syncSearch() {
        const getSearchAllData = await this.openSearchService.getSearchAll();
        const getProductsAllData = await this.productService.getProducts();
        const sortSearchData = getSearchAllData.sort((a, b) => a._id - b._id);
        const sortProductsData = getProductsAllData.sort((a, b) => a.id - b.id);
        const searchLength = sortSearchData.length;
        const productsLength = sortProductsData.length;
        let i = 0;
        let j = 0;
        const uploadArr = [];
        const deleteArr = [];
        while (i < searchLength && j < productsLength) {
            if (sortSearchData[i]._id == sortProductsData[j].id) {
                i++;
                j++;
                continue;
            }
            if (sortSearchData[i]._id < sortProductsData[j].id) {
                deleteArr.push({ id: sortSearchData[i++]._id });
            }
            else {
                uploadArr.push({
                    id: sortProductsData[j].id,
                    productName: sortProductsData[j++].productName,
                });
            }
        }
        if (i == searchLength) {
            for (let k = j; k < productsLength; k++) {
                uploadArr.push({
                    id: sortProductsData[k].id,
                    productName: sortProductsData[k].productName,
                });
            }
        }
        else {
            for (let k = i; k < searchLength; k++) {
                deleteArr.push({ id: sortSearchData[k]._id });
            }
        }
        await this.openSearchService.uploadBulkSearch(uploadArr);
        await this.openSearchService.deleteBulkSearch(deleteArr);
        return;
    }
    async sendAllMail() {
        const date = new Date();
        const month = date.getMonth() + 1;
        const product = '상황버섯주, 유자청주';
        const getAllSubscribeData = await this.subscribesRepository.getAllSubscribe();
        const messages = [];
        for (let i = 0; i < getAllSubscribeData.length; i++) {
            messages.push({
                to: getAllSubscribeData[i].user_email,
                from: process.env.NODEMAILER_EMAIL,
                subject: `${month}월 Drinkit 월간 구독 안내`,
                html: `이달의 상품: ${product}<br/>
              <div>Drinkit 특선 상품!!\n 잔여 포인트를 확인해주세요!!</div>
              <form action="${process.env.DRINKIT_SUBSCRIBE_URL}" method="GET">
              <button>페이지 바로 이동</button>
            </form>`,
            });
        }
        const requestCount = messages.length;
        while (this.transporter.isIdle() && messages.length) {
            const message = messages.shift();
            this.transporter.sendMail(message);
        }
        console.log(`전체 구독자 메일 발송 수량: ${requestCount}`);
        return;
    }
    async sendSelectMail() {
        const date = new Date();
        const month = date.getMonth() + 1;
        const product = '상황버섯주, 유자청주';
        const getSendMailSubscribeData = await this.subscribesRepository.getSendMailSubscribe();
        const messages = [];
        for (let i = 0; i < getSendMailSubscribeData.length; i++) {
            messages.push({
                to: getSendMailSubscribeData[i].user_email,
                from: process.env.NODEMAILER_EMAIL,
                subject: `${month}월 Drinkit 월간 구독 포인트 부족 알림`,
                html: `이달의 상품: ${product}<br/>
            <div>Drinkit 특선 상품!!\n안녕하세요. 고객님\n이번달 구독 상품을 구매 신청하셨으나,\n포인트 잔액이 부족하여 알림 문자 발송드립니다.
            \n매월 1일 결제 예정이니 구매를 원하시면 그 전에 충전 부탁드립니다.</div>
            <form action="${process.env.DRINKIT_SUBSCRIBE_URL}" method="GET">
              <button>페이지 바로 이동</button>
            </form>`,
            });
        }
        const requestCount = messages.length;
        while (this.transporter.isIdle() && messages.length) {
            const message = messages.shift();
            this.transporter.sendMail(message);
        }
        console.log(`구독 포인트 확인 메일 발송 수량: ${requestCount}`);
        return;
    }
    async subscribes() {
        const getSelectSubscribeData = await this.subscribesRepository.getSelectSubscribe();
        try {
            await this.dataSource.transaction(async (manager) => {
                const paymentLogArray = [];
                const userIdArray = [];
                for (let i = 0; i < getSelectSubscribeData.length; i++) {
                    paymentLogArray.push({
                        userId: Number(getSelectSubscribeData[i].subscribe_userId),
                        totalPrice: 0,
                        storeId: 1,
                        paidPoint: Number(process.env.DRINKIT_SUBSCRIBE_PRICE),
                        manager,
                        impUid: 'subscribe',
                        address: getSelectSubscribeData[i].subscribe_address,
                        status: paymentLog_entity_1.PaymentStatus.READY,
                    });
                    userIdArray.push(Number(getSelectSubscribeData[i].subscribe_userId));
                }
                const usersData = await this.usersRepository
                    .createQueryBuilder('user')
                    .where('user.id IN (:...ids)', { ids: userIdArray })
                    .getMany();
                for (let j = 0; j < usersData.length; j++) {
                    usersData[j].point =
                        Number(usersData[j].point) -
                            Number(process.env.DRINKIT_SUBSCRIBE_PRICE);
                }
                await manager
                    .createQueryBuilder()
                    .insert()
                    .into(paymentLog_entity_1.PaymentLog)
                    .values(paymentLogArray)
                    .execute();
                await manager
                    .createQueryBuilder()
                    .insert()
                    .into(user_entity_1.User, [
                    'id',
                    'isAdmin',
                    'email',
                    'isPersonal',
                    'point',
                    'password',
                ])
                    .values(usersData)
                    .orUpdate(['point'], ['id'], {
                    skipUpdateIfNoValuesChanged: true,
                })
                    .execute();
                return;
            });
        }
        catch (err) {
            console.log(err);
            return;
        }
    }
};
__decorate([
    (0, dist_1.Cron)('0 0 */1 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronService.prototype, "syncSearch", null);
__decorate([
    (0, dist_1.Cron)('0 0 0 20 */1 *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronService.prototype, "sendAllMail", null);
__decorate([
    (0, dist_1.Cron)('0 0 0 25 */1 *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronService.prototype, "sendSelectMail", null);
__decorate([
    (0, dist_1.Cron)('0 0 0 1 */1 *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronService.prototype, "subscribes", null);
exports.CronService = CronService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        open_search_service_1.OpenSearchService,
        products_service_1.ProductsService,
        subscribes_repository_1.SubscribesRepository,
        users_repository_1.UsersRepository])
], CronService);
//# sourceMappingURL=cron.service.js.map