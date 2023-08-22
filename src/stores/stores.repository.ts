import { Injectable } from '@nestjs/common';
import { Store } from 'src/entities/store.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class StoresRepository extends Repository<Store> {
  constructor(private datasource: DataSource) {
    super(Store, datasource.createEntityManager());
  }
}
