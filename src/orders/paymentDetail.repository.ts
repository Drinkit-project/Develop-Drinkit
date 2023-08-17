import { Injectable } from '@nestjs/common';
import { PaymentDetail } from 'src/entities/paymentDetail.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PaymentDetailRepository extends Repository<PaymentDetail> {
  constructor(private datasource: DataSource) {
    super(PaymentDetail, datasource.createEntityManager());
  }
}
