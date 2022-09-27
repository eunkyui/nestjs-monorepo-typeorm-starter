import {
  ExceptionFilter, Catch, ArgumentsHost,
  HttpException, HttpStatus, Logger,
} from '@nestjs/common';

const logger = new Logger('HttpExceptionFilter');

interface ClassValidationResult {
  constraints: [keyof string];
}

interface ErrorException {
  status: number;
  message: string | ClassValidationResult[];
  response: ErrorException;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const isHttpException = exception instanceof HttpException || (exception as HttpException).getStatus;
    const status = isHttpException ? (exception as HttpException).getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = isHttpException ? (exception as HttpException).message : (exception as ErrorException).message;
    const detail = (exception as ErrorException).response;

    const resModel = {
      message,
      detail: detail && detail.message && Array.isArray(detail.message) ? detail.message.map(d => d.constraints) : detail || null,
      timestamp: new Date(),
    };
    logger.error(`Message=${message} status=${status}`, resModel);
    response.status(status).send(resModel);
  }
}
