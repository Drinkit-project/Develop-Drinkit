import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import swagger from './swagger.document';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  swagger.build();
  swagger.swaggerSetUp(app);
  await app.listen(3000);
}
bootstrap();
