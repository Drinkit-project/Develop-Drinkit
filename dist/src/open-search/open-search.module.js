"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenSearchModule = void 0;
const common_1 = require("@nestjs/common");
const open_search_controller_1 = require("./open-search.controller");
const open_search_service_1 = require("./open-search.service");
let OpenSearchModule = exports.OpenSearchModule = class OpenSearchModule {
};
exports.OpenSearchModule = OpenSearchModule = __decorate([
    (0, common_1.Module)({
        controllers: [open_search_controller_1.OpenSearchController],
        providers: [open_search_service_1.OpenSearchService]
    })
], OpenSearchModule);
//# sourceMappingURL=open-search.module.js.map