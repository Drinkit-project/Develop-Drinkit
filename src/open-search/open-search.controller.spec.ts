import { Test, TestingModule } from '@nestjs/testing';
import { OpenSearchController } from './open-search.controller';

describe('OpenSearchController', () => {
  let controller: OpenSearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenSearchController],
    }).compile();

    controller = module.get<OpenSearchController>(OpenSearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
