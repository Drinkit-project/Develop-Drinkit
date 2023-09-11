'use strict';
import {
  Inject,
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { PaymentLogRepository } from './paymentLogs.repository';
import { PaymentDetailRepository } from './paymentDetails.repository';
import { Store_ProductRepository } from 'src/stores/store_product.repository';
import { UsersRepository } from 'src/user/users.repository';
import { StoresRepository } from 'src/stores/stores.repository';
import { ProductsRepository } from 'src/products/products.repository';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { Store_Product } from 'src/entities/store_product.entity';
import { PaymentStatus } from 'src/entities/paymentLog.entity';
import { DataSource } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { RedisService } from 'src/redis/redis.service';
import axios from 'axios';

@Injectable()
export class OrdersService {
  constructor(
    private dataSource: DataSource,
    private paymentLogsRepository: PaymentLogRepository,
    private paymentDetailsRepository: PaymentDetailRepository,
    private store_ProductsRepository: Store_ProductRepository,
    private storesRepository: StoresRepository,
    private productsRepository: ProductsRepository,
    private redisService: RedisService,
    private usersRepository: UsersRepository,
    @Inject(CACHE_MANAGER) private cache: Cache,
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
      .createQueryBuilder('store')
      .where('store.id = :storeId', { storeId })
      .getOne();
    return getStoreData;
  }

  async getStoreOrders(userId: number, storeId: number) {
    const getStoreData = await this.getStore(storeId);
    if (getStoreData.userId != userId) {
      throw new PreconditionFailedException();
    }
    const getStoreOrdersData = await this.paymentLogsRepository.getStoreOrders(
      storeId,
    );

    return getStoreOrdersData;
  }

  async getAdminOrders() {
    const getAdminOrdersData =
      await this.paymentLogsRepository.getAdminOrders();

    return getAdminOrdersData;
  }

  async updateOrdersStatusByStore(userId: number, paymentLogId: number) {
    const getPaymentLogData = await this.paymentLogsRepository.getPaymentLog(
      paymentLogId,
    );
    const getStoreData = await this.getStore(getPaymentLogData.storeId);

    if (getStoreData.userId != userId) {
      throw new PreconditionFailedException('권한이 없습니다.');
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

  async updateOrdersStatusByAdmin(paymentLogId: number) {
    const getPaymentLogData = await this.paymentLogsRepository.getPaymentLog(
      paymentLogId,
    );
    if (getPaymentLogData.storeId != 1) {
      throw new PreconditionFailedException('권한이 없습니다.');
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

  async addPoint(userId: number, point: number, impUid: string) {
    try {
      await this.dataSource.transaction(async (manager) => {
        await this.paymentLogsRepository.postPaymentLog(
          userId,
          point,
          1,
          0,
          manager,
          impUid,
          PaymentStatus.COMPLETE,
        );

        const addPointData = await manager
          .createQueryBuilder()
          .update(User)
          .set({ point: () => `point + ${point}` })
          .where('id = :userId', { userId })
          .execute();

        return addPointData;
      });
    } catch (err) {
      console.log(err);
      await this.refund(impUid);
      return '서버오류 - 결제에 대한 환불처리가 완료 되었습니다.';
    }
  }

  async refund(imp_uid: string) {
    const getToken = await axios({
      url: 'https://api.iamport.kr/users/getToken',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: {
        imp_key: process.env.IAMPORT_API_KEY,
        imp_secret: process.env.IAMPORY_SECRET_API_KEY,
      },
    });

    const access_token = getToken.data.response.access_token;
    const getPaymentData = await axios({
      url: `https://api.iamport.kr/payments/${imp_uid}`,
      method: 'get',
      headers: { Authorization: access_token },
    });
    const paymentData = getPaymentData.data.response;

    return paymentData;
  }

  async checkOrderList(
    orderList: Array<{ productId: number; count: number }>,
    userId: number,
    paidPoint: number,
    storeId: number,
    point: number,
  ) {
    const productIdList: Array<number> = [];
    const countList: Array<number> = [];

    orderList.forEach((v) => {
      productIdList.push(v.productId);
      countList.push(v.count);
    });

    if (storeId != 1) {
      const totalStockByStoreProductData = await this.store_ProductsRepository
        .createQueryBuilder('store_product')
        .where('store_product.productId IN (:...ids)', { ids: productIdList })
        .andWhere('store_product.storeId = :storeId', { storeId })
        .orderBy('store_product.productId', 'ASC')
        .getMany();

      totalStockByStoreProductData.forEach((v, i: number) => {
        if (countList[i] > v.storeStock) {
          throw new PreconditionFailedException();
        }
      });
    } else {
      const totalStockByProductData = await this.productsRepository
        .createQueryBuilder('product')
        .where('product.id IN (:...ids)', { ids: productIdList })
        .orderBy('product.id', 'ASC')
        .getMany();

      totalStockByProductData.forEach((v, i: number) => {
        if (countList[i] > v.totalStock) {
          throw new PreconditionFailedException(
            `상품의 재고 수량이 부족합니다.`,
          );
        }
      });
    }

    if (paidPoint < point) {
      return '포인트 보유량이 사용 포인트보다 적습니다.';
    }
    await this.redisService.getRanking();

    return true;
  }

  async postOrder(
    userId: number,
    paidPoint: number,
    totalPrice: number,
    orderList: Array<{ productId: number; count: number }>,
    storeId: number | null,
    impUid: string,
    address: string,
  ) {
    try {
      const productIdList: Array<number> = [];
      const rankList: Array<string | number> = [];
      const countList: Array<number> = [];

      orderList.forEach((v) => {
        productIdList.push(v.productId);
        countList.push(v.count);
        rankList.push(String(v.productId), v.count);
      });

      if (storeId != 1) {
        const totalStockByStoreProductData = await this.store_ProductsRepository
          .createQueryBuilder('store_product')
          .where('store_product.storeId = :storeId', { storeId })
          .andWhere('store_product.productId IN (:...ids)', {
            ids: productIdList,
          })
          .orderBy('store_product.productId', 'ASC')
          .getMany();

        totalStockByStoreProductData.forEach((v, i: number) => {
          if (countList[i] > v.storeStock) {
            throw new PreconditionFailedException();
          }
        });
      } else {
        const totalStockByProductData = await this.productsRepository
          .createQueryBuilder('product')
          .where('product.id IN (:...ids)', { ids: productIdList })
          .orderBy('product.id', 'ASC')
          .getMany();

        totalStockByProductData.forEach((v, i: number) => {
          if (countList[i] > v.totalStock) {
            throw new PreconditionFailedException(
              `상품의 재고 수량이 부족합니다.`,
            );
          }
        });
      }

      await this.dataSource.transaction(async (manager) => {
        //paymentLog 생성
        const postPaymentLogData =
          await this.paymentLogsRepository.postPaymentLog(
            userId,
            totalPrice,
            storeId,
            paidPoint,
            manager,
            impUid,
            address,
          );

        const paymentLogId = postPaymentLogData.identifiers[0].id;
        const paymentDetailArray: Array<{
          productId: number;
          paymentLogId: number;
          count: number;
        }> = [];

        orderList.forEach((v) => {
          paymentDetailArray.push({
            productId: v.productId,
            paymentLogId,
            count: v.count,
          });
        });

        //paymentDetail 생성
        await this.paymentDetailsRepository.postPaymentDetail(
          paymentDetailArray,
          manager,
        );

        //유저 포인트 계산 후 업데이트
        const addPoint = totalPrice * 0.05 - paidPoint;

        await manager
          .createQueryBuilder()
          .update(User)
          .set({ point: () => `point + ${addPoint}` })
          .where('id = :id', { id: userId })
          .execute();

        if (storeId != 1) {
          //store_product 재고 업데이트
          // for (let i = 0; i < countList.length; i++) {
          //   await manager
          //     .createQueryBuilder()
          //     .update(Store_Product)
          //     .set({ storeStock: () => `storeStock - ${countList[i]}` })
          //     .where('productId = :productId', { productId: productIdList[i] })
          //     .execute();
          // }

          const getStoreProductsData = await this.store_ProductsRepository
            .createQueryBuilder('store_product')
            .where('store_product.storeId = :storeId', { storeId })
            .andWhere('store_product.productId IN (:...ids)', {
              ids: productIdList,
            })
            .getMany();

          for (let i = 0; i < countList.length; i++) {
            getStoreProductsData[i].storeStock =
              Number(getStoreProductsData[i].storeStock) - Number(countList[i]);
          }

          await manager
            .createQueryBuilder()
            .insert()
            .into(Store_Product, ['id', 'storeId', 'storeStock', 'productId'])
            .values(getStoreProductsData)
            .orUpdate(['storeStock'], ['id'], {
              skipUpdateIfNoValuesChanged: true,
            })
            .execute();
        } else {
          // for (let i = 0; i < countList.length; i++) {
          //   await manager
          //     .createQueryBuilder()
          //     .update(Product)
          //     .set({
          //       totalStock: () => `totalStock - ${countList[i]}`,
          //     })
          //     .where('id = :productId', { productId: productIdList[i] })
          //     .execute();
          // }

          const getProductsData = await this.productsRepository
            .createQueryBuilder('product')
            .where('product.id IN (:...ids)', { ids: productIdList })
            .getMany();

          for (let i = 0; i < countList.length; i++) {
            getProductsData[i].totalStock =
              Number(getProductsData[i].totalStock) - Number(countList[i]);
          }

          await manager
            .createQueryBuilder()
            .insert()
            .into(Product, [
              'id',
              'price',
              'productName',
              'categoryId',
              'description',
              'imgUrl',
              'totalStock',
            ])
            .values(getProductsData)
            .orUpdate(['totalStock'], ['id'], {
              skipUpdateIfNoValuesChanged: true,
            })
            .execute();
        }
        //레디스 판매량 기록
        await this.redisService.updateRanking(productIdList, countList, true);

        return '결제 완료';
      });
    } catch (err) {
      console.log(err);
      await this.refund(impUid);
      return '서버오류 - 결제에 대한 환불처리가 완료 되었습니다.';
    }
  }

  //

  // 고객 주문 취소 요청
  async requestCancelOrder(userId: number, paymentLogId: number) {
    const getPaymentLogData = await this.paymentLogsRepository.getPaymentLog(
      paymentLogId,
    );

    if (getPaymentLogData.userId != userId) {
      throw new PreconditionFailedException('권한이 없습니다.');
    }

    if (getPaymentLogData.status == PaymentStatus.WAIT_CANCELL) {
      throw new NotFoundException('이미 처리된 요청입니다.');
    }

    const requestCancelOrderData =
      await this.paymentLogsRepository.updateOrdersStatus(
        paymentLogId,
        PaymentStatus.WAIT_CANCELL,
      );

    return requestCancelOrderData;
  }

  // 고객 주문 취소 승인
  async cancelOrderByCustomer(
    userId: number,
    paymentLogId: number,
    isAdmin: boolean,
  ) {
    const getPaymentLogData = await this.paymentLogsRepository.getPaymentLog(
      paymentLogId,
    );

    if (getPaymentLogData.status != PaymentStatus.WAIT_CANCELL) {
      throw new PreconditionFailedException('권한이 없습니다.');
    }

    const getPaymentDetailsData =
      await this.paymentDetailsRepository.getPaymentDetails(paymentLogId);

    if (getPaymentLogData.storeId != 1) {
      const getStoreData = await this.storesRepository
        .createQueryBuilder('store')
        .where('store.userId = :userId', { userId })
        .getOne();
      if (getPaymentLogData.storeId != Number(getStoreData.id)) {
        throw new PreconditionFailedException('권한이 없습니다.');
      }
    } else {
      if (isAdmin != true) {
        throw new PreconditionFailedException('권한이 없습니다.');
      }
    }

    const productIdList: Array<number> = [];
    const countList: Array<number> = [];

    getPaymentDetailsData.forEach((v) => {
      productIdList.push(v.productId);
      countList.push(v.count);
    });

    const addPoint =
      getPaymentLogData.paidPoint - getPaymentLogData.totalPrice * 0.05;

    await this.dataSource.transaction(async (manager) => {
      // 픽업/배송 여부
      if (getPaymentLogData.storeId != 1) {
        const getStoreProductsData = await this.store_ProductsRepository
          .createQueryBuilder('store_product')
          .where('store_product.storeId = :storeId', {
            storeId: getPaymentLogData.storeId,
          })
          .andWhere('store_product.productId IN (:...ids)', {
            ids: productIdList,
          })
          .getMany();

        for (let i = 0; i < countList.length; i++) {
          getStoreProductsData[i].storeStock =
            Number(getStoreProductsData[i].storeStock) + Number(countList[i]);
        }

        await manager
          .createQueryBuilder()
          .insert()
          .into(Store_Product, ['id', 'storeId', 'storeStock', 'productId'])
          .values(getStoreProductsData)
          .orUpdate(['storeStock'], ['id'], {
            skipUpdateIfNoValuesChanged: true,
          })
          .execute();
      } else {
        const getProductsData = await this.productsRepository
          .createQueryBuilder('product')
          .where('product.id IN (:...ids)', { ids: productIdList })
          .getMany();

        for (let i = 0; i < countList.length; i++) {
          getProductsData[i].totalStock =
            Number(getProductsData[i].totalStock) + Number(countList[i]);
        }

        await manager
          .createQueryBuilder()
          .insert()
          .into(Product, [
            'id',
            'price',
            'productName',
            'categoryId',
            'description',
            'imgUrl',
            'totalStock',
          ])
          .values(getProductsData)
          .orUpdate(['totalStock'], ['id'], {
            skipUpdateIfNoValuesChanged: true,
          })
          .execute();
      }

      await manager
        .createQueryBuilder()
        .update(User)
        .set({ point: () => `point + ${addPoint}` })
        .where('id = :id', { id: userId })
        .execute();

      await this.paymentDetailsRepository.deletePaymentDetails(
        paymentLogId,
        manager,
      );

      await this.paymentLogsRepository.deletePaymentLog(paymentLogId, manager);

      //레디스 판매량 기록
      await this.redisService.updateRanking(productIdList, countList, false);

      const refundData = await this.refund(getPaymentLogData.impUid);

      console.log('결제 취소!!', refundData);
      return '환불 / 반품 요청이 완료되었습니다.';
    });
  }

  //스토어 주문 취소
  async cancelOrderByStore(
    userId: number,
    paymentLogId: number,
    storeId: number,
  ) {
    const getPaymentLogData = await this.paymentLogsRepository.getPaymentLog(
      paymentLogId,
    );

    if (getPaymentLogData.storeId != storeId) {
      throw new PreconditionFailedException('권한이 없습니다.');
    }

    const getStoreData = await this.storesRepository
      .createQueryBuilder('store')
      .where('store.userId = :userId', { userId })
      .getOne();

    if (getStoreData.id != storeId) {
      throw new PreconditionFailedException('권한이 없습니다.');
    }

    const getPaymentDetailsData =
      await this.paymentDetailsRepository.getPaymentDetails(paymentLogId);

    const productIdList: Array<number> = [];
    const countList: Array<number> = [];

    getPaymentDetailsData.forEach((v) => {
      productIdList.push(v.productId);
      countList.push(v.count);
    });

    const addPoint =
      getPaymentLogData.paidPoint - getPaymentLogData.totalPrice * 0.05;

    const getStoreProductsData = await this.store_ProductsRepository
      .createQueryBuilder('store_product')
      .where('store_product.storeId = :storeId', { storeId })
      .andWhere('store_product.productId IN (:...ids)', { ids: productIdList })
      .getMany();

    for (let i = 0; i < countList.length; i++) {
      getStoreProductsData[i].storeStock =
        Number(getStoreProductsData[i].storeStock) + Number(countList[i]);
    }

    await this.dataSource.transaction(async (manager) => {
      await manager
        .createQueryBuilder()
        .insert()
        .into(Store_Product, ['id', 'storeId', 'storeStock', 'productId'])
        .values(getStoreProductsData)
        .orUpdate(['storeStock'], ['id'], {
          skipUpdateIfNoValuesChanged: true,
        })
        .execute();

      await manager
        .createQueryBuilder()
        .update(User)
        .set({ point: () => `point + ${addPoint}` })
        .where('id = :id', { id: getPaymentLogData.userId })
        .execute();

      await this.paymentDetailsRepository.deletePaymentDetails(
        paymentLogId,
        manager,
      );

      await this.paymentLogsRepository.deletePaymentLog(paymentLogId, manager);

      //레디스 판매량 기록
      await this.redisService.updateRanking(productIdList, countList, true);

      const refundData = await this.refund(getPaymentLogData.impUid);

      console.log('결제 취소!!', refundData);

      return '주문이 취소되었습니다.';
    });
  }

  // 관리자 주문 취소
  async cancelOrderByAdmin(paymentLogId: number) {
    const getPaymentLogData = await this.paymentLogsRepository.getPaymentLog(
      paymentLogId,
    );
    if (getPaymentLogData.storeId != 1) {
      throw new PreconditionFailedException('권한이 없습니다.');
    }

    const getPaymentDetailsData =
      await this.paymentDetailsRepository.getPaymentDetails(paymentLogId);

    const productIdList: Array<number> = [];
    const countList: Array<number> = [];

    getPaymentDetailsData.forEach((v) => {
      productIdList.push(v.productId);
      countList.push(v.count);
    });

    const addPoint =
      getPaymentLogData.paidPoint - getPaymentLogData.totalPrice * 0.05;

    const getProductsData = await this.productsRepository
      .createQueryBuilder('product')
      .where('product.id IN (:...ids)', { ids: productIdList })
      .getMany();

    for (let i = 0; i < countList.length; i++) {
      getProductsData[i].totalStock =
        Number(getProductsData[i].totalStock) + Number(countList[i]);
    }

    await this.dataSource.transaction(async (manager) => {
      await manager
        .createQueryBuilder()
        .insert()
        .into(Product, [
          'id',
          'price',
          'productName',
          'categoryId',
          'description',
          'imgUrl',
          'totalStock',
        ])
        .values(getProductsData)
        .orUpdate(['totalStock'], ['id'], {
          skipUpdateIfNoValuesChanged: true,
        })
        .execute();

      await manager
        .createQueryBuilder()
        .update(User)
        .set({ point: () => `point + ${addPoint}` })
        .where('id = :id', { id: getPaymentLogData.userId })
        .execute();

      await this.paymentDetailsRepository.deletePaymentDetails(
        paymentLogId,
        manager,
      );

      await this.paymentLogsRepository.deletePaymentLog(paymentLogId, manager);

      //레디스 판매량 기록
      await this.redisService.updateRanking(productIdList, countList, true);

      const refundData = await this.refund(getPaymentLogData.impUid);

      console.log('결제 취소!!', refundData);

      return '주문이 취소되었습니다.';
    });

    return;
  }
}
