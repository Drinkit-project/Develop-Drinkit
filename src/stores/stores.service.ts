import { Injectable } from '@nestjs/common';
import { StoresRepository } from './stores.repository';

@Injectable()
export class StoresService {
  constructor(private readonly storeRepository: StoresRepository) {}
}
