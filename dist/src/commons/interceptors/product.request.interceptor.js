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
exports.TransformBodyInterceptor = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const operators_1 = require("rxjs/operators");
const path = require("path");
const AWS = require("aws-sdk");
let TransformBodyInterceptor = exports.TransformBodyInterceptor = class TransformBodyInterceptor {
    constructor(configService) {
        this.configService = configService;
        this.awsS3 = new AWS.S3({
            accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
            secretAccessKey: this.configService.get('AWS_SECRET_KEY'),
            region: this.configService.get('AWS_S3_REGION'),
        });
        this.S3_BUCKET_NAME = this.configService.get('AWS_S3_BUCKET_NAME');
    }
    async intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { price, productName, categoryId, totalStock, description } = request.body;
        const upload = await this.uploadFileToS3('products', request.file);
        request.body = {
            price: parseInt(price),
            productName,
            categoryId: parseInt(categoryId),
            totalStock: parseInt(totalStock),
            description,
            imgUrl: this.getAwsS3FileUrl(upload.key),
        };
        return next.handle().pipe((0, operators_1.tap)(() => console.log(``)));
    }
    async uploadFileToS3(link, file) {
        try {
            const key = `${link}/${Date.now()}_${path.basename(file.originalname)}`.replace(/ /g, '');
            const s3Object = await this.awsS3
                .putObject({
                Bucket: this.S3_BUCKET_NAME,
                Key: key,
                Body: file.buffer,
                ACL: 'public-read',
                ContentType: file.mimetype,
            })
                .promise();
            return { key, s3Object, contentType: file.mimetype };
        }
        catch (error) {
            throw new common_1.BadRequestException(`File upload failed : ${error}`);
        }
    }
    getAwsS3FileUrl(objectKey) {
        return `https://${this.S3_BUCKET_NAME}.s3.amazonaws.com/${objectKey}`;
    }
};
exports.TransformBodyInterceptor = TransformBodyInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TransformBodyInterceptor);
//# sourceMappingURL=product.request.interceptor.js.map