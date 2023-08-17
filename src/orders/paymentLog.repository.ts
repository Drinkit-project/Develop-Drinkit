import { Injectable } from '@nestjs/common';
import { PaymentLog } from 'src/entities/paymentLog.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PaymentLogRepository extends Repository<PaymentLog> {
  constructor(private datasource: DataSource) {
    super(PaymentLog, datasource.createEntityManager());
  }
}
