import { Test, TestingModule } from '@nestjs/testing';
import { SubscribesController } from './subscribes.controller';

describe('SubscribesController', () => {
  let controller: SubscribesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscribesController],
    }).compile();

    controller = module.get<SubscribesController>(SubscribesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
