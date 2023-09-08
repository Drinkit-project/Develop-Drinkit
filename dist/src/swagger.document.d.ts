import { INestApplication } from '@nestjs/common';
declare class SwaggerDocument {
    private config;
    build(): void;
    swaggerSetUp(app: INestApplication): void;
}
declare const swagger: SwaggerDocument;
export default swagger;
