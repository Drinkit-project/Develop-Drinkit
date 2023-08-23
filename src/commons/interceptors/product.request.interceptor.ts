import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { tap } from 'rxjs/operators';
import * as path from 'path';
import * as AWS from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';

@Injectable()
export class TransformBodyInterceptor implements NestInterceptor {
  private readonly awsS3: AWS.S3;
  public readonly S3_BUCKET_NAME: string;

  constructor(private readonly configService: ConfigService) {
    this.awsS3 = new AWS.S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY'), // process.env.AWS_S3_ACCESS_KEY
      secretAccessKey: this.configService.get('AWS_SECRET_KEY'),
      region: this.configService.get('AWS_S3_REGION'),
    });
    this.S3_BUCKET_NAME = this.configService.get('AWS_S3_BUCKET_NAME'); // nest-s3
  }

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    const { price, productName, categoryId, totalStock, description } =
      request.body;

    const upload = await this.uploadFileToS3('products', request.file);

    request.body = {
      price: parseInt(price),
      productName,
      categoryId: parseInt(categoryId),
      totalStock: parseInt(totalStock),
      description,
      imgUrl: this.getAwsS3FileUrl(upload.key),
    };

    return next.handle().pipe(tap(() => console.log(``)));
  }

  async uploadFileToS3(
    link: string,
    file: Express.Multer.File,
  ): Promise<{
    key: string;
    s3Object: PromiseResult<AWS.S3.PutObjectOutput, AWS.AWSError>;
    contentType: string;
  }> {
    try {
      const key = `${link}/${Date.now()}_${path.basename(
        file.originalname,
      )}`.replace(/ /g, '');

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
    } catch (error) {
      throw new BadRequestException(`File upload failed : ${error}`);
    }
  }

  public getAwsS3FileUrl(objectKey: string) {
    return `https://${this.S3_BUCKET_NAME}.s3.amazonaws.com/${objectKey}`;
  }
}
