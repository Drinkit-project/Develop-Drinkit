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
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../entities/user.entity");
const typeorm_1 = require("typeorm");
const profile_entity_1 = require("../entities/profile.entity");
let UsersRepository = exports.UsersRepository = class UsersRepository extends typeorm_1.Repository {
    constructor(datasource) {
        super(user_entity_1.User, datasource.createEntityManager());
        this.datasource = datasource;
    }
    async findUser(options) {
        const user = await this.createQueryBuilder('user')
            .innerJoin(profile_entity_1.Profile, 'profile', 'profile.userId = user.id')
            .select([
            'user.id AS "id"',
            'profile.nickname AS "nickname"',
            'user.isAdmin AS "isAdmin"',
            'user.isPersonal AS "isPersonal"',
        ])
            .where(options.where)
            .getRawOne();
        return user;
    }
    async findUserForSignIn(options) {
        const user = await this.createQueryBuilder('user')
            .innerJoin(profile_entity_1.Profile, 'profile', 'profile.userId = user.id')
            .select([
            'user.id AS "id"',
            'profile.nickname AS "nickname"',
            'user.password AS "password"',
        ])
            .where(options.where)
            .getRawOne();
        return user;
    }
};
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map