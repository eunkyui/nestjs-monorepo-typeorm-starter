import {
  Controller, Get, Req,
  Res, HttpStatus,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { FastifyRequest, FastifyReply } from 'fastify';

@Controller()
@ApiTags('Main')
export class ApiController {
  constructor(
  ) { }

  @Get()
  async getHealth(
    @Req() request: FastifyRequest,
    @Res() response: FastifyReply,
  ) {
    response.status(HttpStatus.OK).send({ health: true });
  }
}
