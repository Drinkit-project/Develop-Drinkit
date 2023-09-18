/// <reference types="multer" />
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
export declare class TransformBodyInterceptor implements NestInterceptor {
    private readonly configService;
    private readonly awsS3;
    readonly S3_BUCKET_NAME: string;
    constructor(configService: ConfigService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<import("rxjs").Observable<any>>;
    uploadFileToS3(link: string, file: Express.Multer.File): Promise<{
        key: string;
        s3Object: PromiseResult<AWS.S3.PutObjectOutput, AWS.AWSError>;
        contentType: string;
    }>;
    getAwsS3FileUrl(objectKey: string): string;
}
