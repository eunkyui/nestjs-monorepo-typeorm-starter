import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';
import { classToPlain } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { DefaultResponse, ResponseStatus } from '../res';
import { CustomValidationError } from './CustomValidationError';

@Catch(BadRequestException)
export class BadParameterFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const responseBody = exception.response;
    const isValidationError = responseBody instanceof ValidationError;

    response
      .status(status)
      .json(
        classToPlain(
          DefaultResponse.ERROR_WITH_DATA<CustomValidationError[]>(
            '요청 값에 문제가 있습니다.',
            ResponseStatus.BAD_PARAMETER,
            isValidationError
              ? [this.toCustomValidationErrorByNest(responseBody)]
              : (responseBody.message as CustomValidationError[]),
          ),
        ),
      );
  }

  toCustomValidationErrorByNest(
    responseBody: ValidationError,
  ): CustomValidationError {
    return new CustomValidationError(responseBody);
  }
}
