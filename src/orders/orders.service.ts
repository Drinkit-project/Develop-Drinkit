import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { PaymentLogRepository } from './paymentLogs.repository';
import { PaymentDetailRepository } from './paymentDetails.repository';
import { Store_ProductRepository } from '../products/store_products.repository';
import { UserRepository } from '../users/users.repository';
import { ProductsRepository } from 'src/products/products.repository';
import { Product } from 'src/entities/product.entity';
import { PaymentLog } from 'src/entities/paymentLog.entity';
import { PaymentDetail } from 'src/entities/paymentDetail.entity';
import { User } from 'src/entities/user.entity';
import { Store_Product } from 'src/entities/store_product.entity';

@Injectable()
export class OrdersService {
  constructor(
    private paymentLogsRepository: PaymentLogRepository,
    private paymentDetailsRepository: PaymentDetailRepository,
    private store_ProductsRepository: Store_ProductRepository,
    private usersRepository: UserRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async getOrders(userId: number) {
    const getOrdersData = await this.paymentLogsRepository.getOrders(userId);
    return getOrdersData;
  }

  async getOrdersDetail(paymentLogId: number) {
    const getOrdersDetailData =
      await this.paymentDetailsRepository.getOrdersDetail(paymentLogId);
    return getOrdersDetailData;
  }

  async checkOrderList(
    orderList: Array<{ productId: number; count: number }>,
    userId: number,
    usePoint: boolean,
    storeId: number | null,
  ) {
    let productIdList: Array<number>;
    let countList: Array<number>;

    orderList.forEach((v) => {
      productIdList.push(v.productId);
      countList.push(v.count);
    });

    if (storeId) {
      const totalStockByStoreProductData = await this.store_ProductsRepository
        .createQueryBuilder('store_product')
        .where('store_product.productId IN (:productId)', {
          productId: productIdList,
        })
        .getMany();

      totalStockByStoreProductData.forEach((v, i: number) => {
        if (countList[i] > v.totalStock) {
          return new PreconditionFailedException();
        }
      });
    } else {
      const totalStockByProductData = await this.productsRepository
        .createQueryBuilder('product')
        .where('product.id IN (:id)', {
          id: productIdList,
        })
        .getMany();

      totalStockByProductData.forEach((v, i: number) => {
        if (countList[i] > v.totalStock) {
          return new PreconditionFailedException();
        }
      });
    }

    if (usePoint) {
      const userPointData = await this.usersRepository
        .createQueryBuilder()
        .where('id = :userId', { userId })
        .getOne();
      return userPointData.point;
    }

    return 0;
  }

  async postOrder(
    userId: number,
    point: number,
    totalPrice: number,
    orderList: Array<{ productId: number; count: number }>,
    storeId: number | null,
  ) {
    //paymentLog 생성
    const postPaymentLogData = await this.paymentLogsRepository.postPaymentLog(
      userId,
      totalPrice,
      storeId,
    );

    const findPaymentLogData = await this.paymentLogsRepository.findPaymentLog(
      userId,
    );

    const paymentLogId = Number(findPaymentLogData.id);

    let paymentDetailArray: Array<{ productId: number; paymentLogId: number }>;
    let productIdList: Array<number>;
    let countList: Array<number>;

    orderList.forEach((v) => {
      paymentDetailArray.push({ productId: v.productId, paymentLogId });
      productIdList.push(v.productId);
      countList.push(v.count);
    });

    //paymentDetail 생성
    const postPaymentDetailData =
      await this.paymentDetailsRepository.postPaymentDetail(paymentDetailArray);

    //유저 포인트 계산 후 업데이트
    const addPoint = totalPrice * 0.05 - point;

    const updateUserPointData = await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ point: () => `point + ${addPoint}` })
      .where('id = :id', { id: userId })
      .execute();

    if (storeId) {
      //store_product 재고 업데이트
      const updateTotalStockByStoreProduct = await this.store_ProductsRepository
        .createQueryBuilder('store_product')
        .update(Store_Product)
        .set({ totalStock: () => `totalStock + ${countList}` })
        .where('store_product.productId IN (:productId)', {
          productId: productIdList,
        })
        .execute();
    } else {
      //product 재고 업데이트
      const updateTotalStockByProduct = await this.productsRepository
        .createQueryBuilder('product')
        .update(Product)
        .set({ totalStock: () => `totalStock + ${countList}` })
        .where('product.id IN (:id)', {
          id: productIdList,
        })
        .execute();
    }
    //todo: 레디스 누적판매량갱신(추후)
  }
}
