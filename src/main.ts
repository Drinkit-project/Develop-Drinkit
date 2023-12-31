import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import swagger from './swagger.document';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './commons/exceptions/httpException.filter';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  swagger.build();
  swagger.swaggerSetUp(app);

  app.use(cookieParser());
  app.enableCors({
    origin: ['https://drinkit.site', 'http://localhost:3200'], // 허용할 도메인
    credentials: true, // 요청에 쿠키 정보를 함께 보냄
  });

  // class validator 전역 적용
  app.useGlobalPipes(new ValidationPipe());
  // httpExceptionfilter활성화 예외처리 전역 필터 설정
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
