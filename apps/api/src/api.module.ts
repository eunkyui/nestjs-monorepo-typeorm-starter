
import {
  Module, NestModule, MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { HttpExceptionFilter } from './filter';
import { TraceMiddleware } from './middleware';


import { ApiController } from './api.controller';
import { WinstonModule } from 'nest-winston';
import { getWinstonLogger, getPgRealTypeOrmModule } from '@nest-mono-sample/core';

@Module({
  imports: [
    getPgRealTypeOrmModule(),
    WinstonModule.forRoot(getWinstonLogger(process.env.NODE_ENV, 'api')),
  ],
  controllers: [ApiController],
  providers: [
  ],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TraceMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
