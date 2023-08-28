import { Test, TestingModule } from '@nestjs/testing';
import { OpenSearchService } from './open-search.service';

describe('OpenSearchService', () => {
  let service: OpenSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenSearchService],
    }).compile();

    service = module.get<OpenSearchService>(OpenSearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
