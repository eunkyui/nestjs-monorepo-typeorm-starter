import { Controller, Get } from '@nestjs/common';
import { BatchService } from './batch.service';

@Controller()
export class BatchController {
  constructor(private readonly batchService: BatchService) {}

  @Get()
  getHello(): string {
    return this.batchService.getHello();
  }
}
