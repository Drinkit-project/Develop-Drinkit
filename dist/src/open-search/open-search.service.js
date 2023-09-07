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
exports.OpenSearchService = void 0;
const common_1 = require("@nestjs/common");
const opensearch_1 = require("@opensearch-project/opensearch");
const config_1 = require("@nestjs/config");
let OpenSearchService = exports.OpenSearchService = class OpenSearchService {
    constructor(configService) {
        this.configService = configService;
        this.client = new opensearch_1.Client({
            node: this.configService.get('OPEN_SEARCH_HOST'),
            auth: {
                username: this.configService.get('OPEN_SEARCH_NAME'),
                password: this.configService.get('OPEN_SEARCH_PASSWORD'),
            },
        });
    }
    async uploadSearch(productId, productName) {
        const document = {
            id: Number(productId),
            productName: productName,
        };
        const createDocument = await this.client.index({
            index: this.configService.get('OPEN_SEARCH_INDEX'),
            body: document,
            id: String(productId),
        });
        return createDocument;
    }
    async uploadBulkSearch(document) {
        const uploadBulkSearchData = await this.client.helpers.bulk({
            datasource: document,
            onDocument(doc) {
                return {
                    create: {
                        _index: process.env.OPEN_SEARCH_INDEX,
                        _id: String(doc.id),
                    },
                };
            },
        });
        return uploadBulkSearchData;
    }
    async getSearch(keyword) {
        const query = {
            query: {
                match: {
                    productName: {
                        query: keyword,
                    },
                },
            },
        };
        const response = await this.client.search({
            index: this.configService.get('OPEN_SEARCH_INDEX'),
            size: 10000,
            body: query,
        });
        return response['body']['hits']['hits'];
    }
    async getSearchAll() {
        const query = {
            query: {
                match_all: {},
            },
        };
        const response = await this.client.search({
            index: this.configService.get('OPEN_SEARCH_INDEX'),
            size: 10000,
            body: query,
        });
        return response['body']['hits']['hits'];
    }
    async deleteSearch(productId) {
        const deleteSearchData = await this.client.delete({
            index: this.configService.get('OPEN_SEARCH_INDEX'),
            id: String(productId),
        });
        return deleteSearchData;
    }
    async deleteBulkSearch(document) {
        const deleteBulkSearchData = this.client.helpers.bulk({
            datasource: document,
            onDocument(doc) {
                return {
                    delete: {
                        _index: process.env.OPEN_SEARCH_INDEX,
                        _id: String(doc.id),
                    },
                };
            },
        });
        return deleteBulkSearchData;
    }
};
exports.OpenSearchService = OpenSearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], OpenSearchService);
//# sourceMappingURL=open-search.service.js.map