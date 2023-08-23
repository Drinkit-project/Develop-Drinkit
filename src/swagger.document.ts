import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

class SwaggerDocument {
  private config;

  public build() {
    this.config = new DocumentBuilder()
      .setTitle('Drink!t Project')
      .setDescription('The Drink!t Project API description')
      .setVersion('1.0')
      .addTag('Drink!t')
      .build();
  }

  public swaggerSetUp(app: INestApplication) {
    const document = SwaggerModule.createDocument(app, this.config);
    SwaggerModule.setup('doc', app, document);
  }
}

const swagger = new SwaggerDocument();

export default swagger;
