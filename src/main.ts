import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.use(helmet());
  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" }, contentSecurityPolicy: false }));

  app.enableCors()
  app.use('/', express.static('../dist/malanka-fe'));

  const config = new DocumentBuilder()
      .setTitle('Malanka BE')
      .setDescription('Malanka BE API description')
      .setVersion('1.0')
      .addTag('nest')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  console.log(process.env.PORT);
  await app.listen(process.env.PORT || 8080, "0.0.0.0");
  //await app.listen(process.env.PORT || 3000, "0.0.0.0");
}
bootstrap();
