import { Module } from '@nestjs/common';
import { UserApiController } from './userapi.controller';
import { UserApiService } from './userapi.service';
import { UserModule, UserQueryRepository } from '@nest-mono-sample/core';

@Module({
  imports: [UserModule],
  controllers: [UserApiController],
  providers: [UserApiService, UserQueryRepository],
})
export class UserApiModule {}
