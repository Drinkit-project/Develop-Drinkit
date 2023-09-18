"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalUser = exports.AdminUser = exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.myUser;
});
exports.AdminUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.myUser.isAdmin)
        throw new common_1.BadRequestException('권한 없음');
    return request.myUser;
});
exports.PersonalUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.myUser.isPersonal)
        throw new common_1.BadRequestException('권한 없음');
    return request.myUser;
});
//# sourceMappingURL=user.decorators.js.map