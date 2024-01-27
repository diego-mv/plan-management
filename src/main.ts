import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';


async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('API Plan Management')
    .setDescription('API to manage user career plans')
    .setVersion('1.0')
    .addBearerAuth({
      description: "Basic JWT (It is not necessary to enter the carrier word before the token )",
      type: 'http',
    })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}

bootstrap();
