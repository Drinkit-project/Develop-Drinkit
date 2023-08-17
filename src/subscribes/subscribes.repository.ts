import { Injectable } from '@nestjs/common';
import { Subscribe } from 'src/entities/subscribe.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SubscribesRepository extends Repository<Subscribe> {
  constructor(private datasource: DataSource) {
    super(Subscribe, datasource.createEntityManager());
  }
}
