"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_document_1 = require("./swagger.document");
const common_1 = require("@nestjs/common");
const httpException_filter_1 = require("./commons/exceptions/httpException.filter");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    swagger_document_1.default.build();
    swagger_document_1.default.swaggerSetUp(app);
    app.use(cookieParser());
    app.enableCors({
        origin: 'http://localhost:3200',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new httpException_filter_1.HttpExceptionFilter());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map