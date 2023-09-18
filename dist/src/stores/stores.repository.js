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
exports.StoresRepository = void 0;
const common_1 = require("@nestjs/common");
const store_entity_1 = require("../entities/store.entity");
const typeorm_1 = require("typeorm");
let StoresRepository = exports.StoresRepository = class StoresRepository extends typeorm_1.Repository {
    constructor(datasource) {
        super(store_entity_1.Store, datasource.createEntityManager());
        this.datasource = datasource;
    }
    findStoreById(id) {
        return this.createQueryBuilder('store')
            .leftJoinAndSelect('store.user', 'user')
            .leftJoinAndSelect('store.productList', 'store_product')
            .where('store.id = :id', { id })
            .getOne();
    }
    async findStoreByStock(body) {
        let query = '';
        for (let i = 1; i < body.length; i++) {
            query += `AND s."id" IN (
        SELECT sp."storeId" FROM "store_product" as sp
        WHERE (sp."productId" = ${body[i].productId} AND sp."storeStock" >= ${body[i].count})
      )`;
        }
        const store = this.query(`SELECT s."id", s."address", s."name", s."description", s."imgUrls", s."lat", s."lng" FROM "store" as s
    WHERE s."id"
    IN (SELECT sp."storeId" FROM "store_product" as sp
      WHERE (sp."productId" = ${body[0].productId} AND sp."storeStock" >= ${body[0].count})
    )` + query);
        return store;
    }
    createStore(obj, userId) {
        const store = this.createQueryBuilder('store')
            .insert()
            .into(store_entity_1.Store)
            .values({ ...obj, userId })
            .execute();
        return store;
    }
};
exports.StoresRepository = StoresRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], StoresRepository);
//# sourceMappingURL=stores.repository.js.map