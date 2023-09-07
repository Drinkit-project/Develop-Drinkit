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
exports.CategoryRepository = void 0;
const common_1 = require("@nestjs/common");
const category_entity_1 = require("../../entities/category.entity");
const typeorm_1 = require("typeorm");
let CategoryRepository = exports.CategoryRepository = class CategoryRepository extends typeorm_1.Repository {
    constructor(datasource) {
        super(category_entity_1.Category, datasource.createEntityManager());
        this.datasource = datasource;
    }
    async getAllCategory() {
        const categories = await this.createQueryBuilder('category').getMany();
        return categories;
    }
    async createCategory(data) {
        try {
            const result = await this.createQueryBuilder('category')
                .insert()
                .into(category_entity_1.Category)
                .values(data)
                .execute();
            return result;
        }
        catch (e) {
            throw new common_1.BadRequestException('중복된 카테고리입니다.');
        }
    }
    deleteCategory(id) {
        return this.createQueryBuilder('category')
            .delete()
            .where('id=:id', { id })
            .execute();
    }
};
exports.CategoryRepository = CategoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], CategoryRepository);
//# sourceMappingURL=category.repository.js.map