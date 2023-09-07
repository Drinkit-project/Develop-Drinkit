"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
class SwaggerDocument {
    build() {
        this.config = new swagger_1.DocumentBuilder()
            .setTitle('Drink!t Project')
            .setDescription('The Drink!t Project API description')
            .setVersion('1.0')
            .addTag('Drink!t')
            .build();
    }
    swaggerSetUp(app) {
        const document = swagger_1.SwaggerModule.createDocument(app, this.config);
        swagger_1.SwaggerModule.setup('doc', app, document);
    }
}
const swagger = new SwaggerDocument();
exports.default = swagger;
//# sourceMappingURL=swagger.document.js.map