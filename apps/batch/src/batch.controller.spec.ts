import { Test, TestingModule } from '@nestjs/testing';
import { BatchController } from './batch.controller';
import { BatchService } from './batch.service';

describe('BatchController', () => {
  let batchController: BatchController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BatchController],
      providers: [BatchService],
    }).compile();

    batchController = app.get<BatchController>(BatchController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(batchController.getHello()).toBe('Hello World!');
    });
  });
});
