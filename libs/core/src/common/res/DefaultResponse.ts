import { ApiProperty } from '@nestjs/swagger';
import { ResponseStatus } from './ResponseStatus';
import { Exclude, Expose } from 'class-transformer';

export class DefaultResponse<T> {
  @Exclude() private readonly _statusCode: string;
  @Exclude() private readonly _message: string;
  @Exclude() private readonly _data: T;

  private constructor(status: ResponseStatus, message: string, data: T) {
    this._statusCode = ResponseStatus[status];
    this._message = message;
    this._data = data;
  }

  static OK(): DefaultResponse<string> {
    return new DefaultResponse<string>(ResponseStatus.OK, '', '');
  }

  static OK_WITH<T>(data: T): DefaultResponse<T> {
    return new DefaultResponse<T>(ResponseStatus.OK, '', data);
  }

  static ERROR(): DefaultResponse<string> {
    return new DefaultResponse<string>(
      ResponseStatus.SERVER_ERROR,
      '서버 에러가 발생했습니다.',
      '',
    );
  }

  static ERROR_WITH(
    message: string,
    code: ResponseStatus = ResponseStatus.SERVER_ERROR,
  ): DefaultResponse<string> {
    return new DefaultResponse<string>(code, message, '');
  }

  static ERROR_WITH_DATA<T>(
    message: string,
    code: ResponseStatus = ResponseStatus.SERVER_ERROR,
    data: T,
  ): DefaultResponse<T> {
    return new DefaultResponse<T>(code, message, data);
  }

  @ApiProperty()
  @Expose()
  get statusCode(): string {
    return this._statusCode;
  }

  @ApiProperty()
  @Expose()
  get message(): string {
    return this._message;
  }

  @ApiProperty()
  @Expose()
  get data(): T {
    return this._data;
  }
}
