import { v4 as uuidv4 } from 'uuid';

import { Injectable, NestMiddleware } from '@nestjs/common';
import { IncomingMessage, ServerResponse } from 'http';
import { Logger } from '@nestjs/common';

const logger = new Logger('TraceMiddleware');

interface MiddlewareRequest extends IncomingMessage {
  originalUrl: string;
}

@Injectable()
export class TraceMiddleware implements NestMiddleware {
  use(request: MiddlewareRequest, response: ServerResponse, next: () => void) {
    const tracingId = uuidv4();
    const {
      method,
      socket,
      originalUrl,
    } = request;

    // TODO: user, device object logging
    logger.log(`=> [${tracingId}] ${method} ${originalUrl} - ${request.headers['user-agent']}, ${socket.remoteAddress}`);
    const start = new Date();

    response.on('finish', () => {
      const { statusCode } = response;
      const ms = Date.now() - start.getTime();

      logger.log(`<= [${tracingId}] ${method} ${originalUrl} - ${statusCode} ${ms}ms`, { tracingId, method, originalUrl, statusCode, ms, type: 'RESPONSE_TRACKING' });
    });

    response.setHeader('TracingID', tracingId);
    next();
  }
}
