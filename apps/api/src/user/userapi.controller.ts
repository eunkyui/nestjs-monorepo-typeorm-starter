import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UserApiService } from './userapi.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DefaultResponse, User } from '@nest-mono-sample/core';
import { UserShowDto } from '@nest-mono-sample/shared';

@Controller('/user')
@ApiTags('유저 API')
export class UserApiController {
  constructor(
    private readonly userApiService: UserApiService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get('/hello')
  @ApiOperation({
    summary: '테스트 API',
  })
  @ApiOkResponse({
    description: '테스트 API.',
    type: DefaultResponse,
  })
  getHello(): DefaultResponse<string> {
    this.logger.info('>>>>>>>>>>> Test');
    return DefaultResponse.OK_WITH(this.userApiService.getHello());
  }

  @Get('/show')
  show(): DefaultResponse<UserShowDto> {
    return DefaultResponse.OK_WITH(
      new UserShowDto(
        User.signup('KilDong', 'Hong')
      ),
    );
  }

  @Get('/')
  async getUsers(): Promise<User[]> {
    return await this.userApiService.findAll();
  }
}
