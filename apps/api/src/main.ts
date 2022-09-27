import dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import FastifyMultipart from 'fastify-multipart';
import { ApiModule } from './api.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';


const logger = new Logger('Main');

function fatalExceptionHandler(err: Error) {
  logger.error('Exception handler:', { message: err.message, stack: err.stack, isFatal: true });
  process.exit(1);
}

async function bootstrap() {
  process.on('uncaughtException', fatalExceptionHandler);
  process.on('unhandledRejection', fatalExceptionHandler);

  const fastifyAdapter = new FastifyAdapter();
  fastifyAdapter.register(FastifyMultipart);

  const app: NestFastifyApplication = await NestFactory.create(ApiModule, fastifyAdapter);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );

  const swaggerOption = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Nest-Mono-Sample Mobile App API Docs')
    .setDescription('est-Mono-Sample Mobile App API documentation')
    .setVersion('0.0.1')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOption);
  SwaggerModule.setup('api-docs', app, swaggerDocument);

  await app.listen(3000);
  logger.log(`API server up and running`);
};

bootstrap();