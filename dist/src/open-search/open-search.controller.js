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
exports.OpenSearchController = void 0;
const common_1 = require("@nestjs/common");
const open_search_service_1 = require("./open-search.service");
let OpenSearchController = exports.OpenSearchController = class OpenSearchController {
    constructor(openSearchService) {
        this.openSearchService = openSearchService;
    }
    async getSearch(keyword) {
        const getSearchData = await this.openSearchService.getSearch(keyword);
        return getSearchData;
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('keyword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OpenSearchController.prototype, "getSearch", null);
exports.OpenSearchController = OpenSearchController = __decorate([
    (0, common_1.Controller)('open-search'),
    __metadata("design:paramtypes", [open_search_service_1.OpenSearchService])
], OpenSearchController);
//# sourceMappingURL=open-search.controller.js.map