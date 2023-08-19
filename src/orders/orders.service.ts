import {
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { PaymentLogRepository } from './paymentLogs.repository';
import { PaymentDetailRepository } from './paymentDetails.repository';
import { Store_ProductsRepository } from 'src/products/store_products.repository';
import { UsersRepository } from 'src/users/users.repository';
import { StoresRepository } from 'src/stores/stores.repository';
import { ProductsRepository } from 'src/products/products.repository';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { Store_Product } from 'src/entities/store_product.entity';
import { PaymentStatus } from 'src/entities/paymentLog.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    private dataSource: DataSource,
    private paymentLogsRepository: PaymentLogRepository,
    private paymentDetailsRepository: PaymentDetailRepository,
    private store_ProductsRepository: Store_ProductsRepository,
    private storesRepository: StoresRepository,
    private usersRepository: UsersRepository,
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
  async getStore(storeId: number) {
    const getStoreData = await this.storesRepository
      .createQueryBuilder()
      .where('id = :storeId', { id: storeId })
      .getOne();
    return getStoreData;
  }

  async getStoreOrders(userId: number, storeId: number) {
    const getStoreData = await this.getStore(storeId);

    if (getStoreData.userId != userId) {
      return new PreconditionFailedException();
    }
    const getStoreOrdersData = await this.paymentLogsRepository.getStoreOrders(
      storeId,
    );

    return getStoreOrdersData;
  }

  async updateOrdersStatusByStore(userId: number, paymentLogId: number) {
    const getPaymentLogData = await this.paymentLogsRepository.getPaymentLog(
      paymentLogId,
    );
    const getStoreData = await this.getStore(getPaymentLogData.storeId);

    if (getStoreData.userId != userId) {
      return new PreconditionFailedException('권한이 없습니다.');
    }

    let status: PaymentStatus;
    if (getPaymentLogData.status == PaymentStatus.ORDER_PENDING) {
      status = PaymentStatus.READY;
    } else if (getPaymentLogData.status == PaymentStatus.READY) {
      status = PaymentStatus.READY_COMPLETE;
    } else if (getPaymentLogData.status == PaymentStatus.READY_COMPLETE) {
      status = PaymentStatus.PICKUP;
    } else if (getPaymentLogData.status == PaymentStatus.PICKUP) {
      status = PaymentStatus.COMPLETE;
    }

    const updateOrdersStatusByStoreData =
      await this.paymentLogsRepository.updateOrdersStatus(paymentLogId, status);
    return updateOrdersStatusByStoreData;
  }

  async updateOrdersStatusByAdmin(userId: number, paymentLogId: number) {
    const getPaymentLogData = await this.paymentLogsRepository.getPaymentLog(
      paymentLogId,
    );

    if (getPaymentLogData.storeId) {
      return new PreconditionFailedException('권한이 없습니다.');
    }

    let status: PaymentStatus;
    if (getPaymentLogData.status == PaymentStatus.ORDER_PENDING) {
      status = PaymentStatus.READY;
    } else if (getPaymentLogData.status == PaymentStatus.READY) {
      status = PaymentStatus.READY_COMPLETE;
    } else if (getPaymentLogData.status == PaymentStatus.READY_COMPLETE) {
      status = PaymentStatus.DELIVERY;
    } else if (getPaymentLogData.status == PaymentStatus.DELIVERY) {
      status = PaymentStatus.COMPLETE;
    }

    const updateOrdersStatusByStoreData =
      await this.paymentLogsRepository.updateOrdersStatus(paymentLogId, status);
    return updateOrdersStatusByStoreData;
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
    paidPoint: number,
    totalPrice: number,
    orderList: Array<{ productId: number; count: number }>,
    storeId: number | null,
  ) {
    await this.dataSource.transaction(async (manager) => {
      //paymentLog 생성
      const postPaymentLogData =
        await this.paymentLogsRepository.postPaymentLog(
          userId,
          totalPrice,
          storeId,
          paidPoint,
          manager,
        );

      //find도 manager로 해야하는지?
      const findPaymentLogData =
        await this.paymentLogsRepository.findPaymentLog(userId);

      const paymentLogId = Number(findPaymentLogData.id);

      let paymentDetailArray: Array<{
        productId: number;
        paymentLogId: number;
        count: number;
      }>;
      let productIdList: Array<number>;
      let countList: Array<number>;

      orderList.forEach((v) => {
        paymentDetailArray.push({
          productId: v.productId,
          paymentLogId,
          count: v.count,
        });
        productIdList.push(v.productId);
        countList.push(v.count);
      });

      //paymentDetail 생성
      const postPaymentDetailData =
        await this.paymentDetailsRepository.postPaymentDetail(
          paymentDetailArray,
          manager,
        );

      //유저 포인트 계산 후 업데이트
      const addPoint = totalPrice * 0.05 - paidPoint;

      const updateUserPointData = await manager
        .createQueryBuilder()
        .update(User)
        .set({ point: () => `point + ${addPoint}` })
        .where('id = :id', { id: userId })
        .execute();

      if (storeId) {
        //store_product 재고 업데이트
        const updateTotalStockByStoreProduct = await manager
          .createQueryBuilder()
          .update(Store_Product)
          .set({ totalStock: () => `totalStock - ${countList}` })
          .where('productId IN (:productId)', {
            productId: productIdList,
          })
          .execute();
      } else {
        //product 재고 업데이트
        const updateTotalStockByProduct = manager
          .createQueryBuilder()
          .update(Product)
          .set({ totalStock: () => `totalStock - ${countList}` })
          .where('id IN (:id)', {
            id: productIdList,
          })
          .execute();
      }
      //todo: 레디스 누적판매량갱신(추후)
      return '결제 완료';
    });
  }

  // 고객 주문 취소 요청
  async requestCancelOrder(userId: number, paymentLogId: number) {
    const getPaymentLogData = await this.paymentLogsRepository.getPaymentLog(
      paymentLogId,
    );

    if (getPaymentLogData.userId != userId) {
      return new PreconditionFailedException('권한이 없습니다.');
    }

    if (getPaymentLogData.status == PaymentStatus.WAIT_CANCELL) {
      return new NotFoundException('이미 처리된 요청입니다.');
    }

    const requestCancelOrderData =
      await this.paymentLogsRepository.updateOrdersStatus(
        paymentLogId,
        PaymentStatus.WAIT_CANCELL,
      );

    return requestCancelOrderData;
  }

  // 고객 주문 취소
  async cancelOrderByCustomer(userId: number, paymentLogId: number) {
    const getPaymentLogData = await this.paymentLogsRepository.getPaymentLog(
      paymentLogId,
    );

    const getUserData = await this.usersRepository
      .createQueryBuilder()
      .where('id = :userId', { userId })
      .getOne();

    const getOrderDetailData =
      await this.paymentDetailsRepository.getOrdersDetail(paymentLogId);

    if (getPaymentLogData.storeId == null) {
      if (getUserData.isAdmin != true) {
        return new PreconditionFailedException('권한이 없습니다.');
      }
    } else {
      const getStoreData = this.storesRepository
        .createQueryBuilder()
        .where('userId = :userId', { userId })
        .getOne();
      if (getPaymentLogData.storeId != getStoreData.id) {
        return new PreconditionFailedException('권한이 없습니다.');
      }
    }

    let productIdList: Array<number>;
    let countList: Array<number>;

    getOrderDetailData.forEach((v) => {
      productIdList.push(v.productId);
      countList.push(v.count);
    });

    const addPoint =
      getPaymentLogData.paidPoint - getPaymentLogData.totalPrice * 0.05;

    await this.dataSource.transaction(async (manager) => {
      // 픽업/배송 여부
      if (getPaymentLogData.storeId) {
        const updateTotalStockByStoreProduct = await manager
          .createQueryBuilder()
          .update(Store_Product)
          .set({ totalStock: () => `totalStock - ${countList}` })
          .where('productId IN (:productId)', {
            productId: productIdList,
          })
          .execute();
      } else {
        const updateTotalStockByProduct = manager
          .createQueryBuilder()
          .update(Product)
          .set({ totalStock: () => `totalStock - ${countList}` })
          .where('id IN (:id)', {
            id: productIdList,
          })
          .execute();
      }

      const updateUserPointData = await manager
        .createQueryBuilder()
        .update(User)
        .set({ point: () => `point + ${addPoint}` })
        .where('id = :id', { id: userId })
        .execute();

      return '환불 / 반품 요청이 완료되었습니다.';
    });
  }
}
