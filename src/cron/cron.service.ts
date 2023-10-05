import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule/dist';
import { OpenSearchService } from 'src/open-search/open-search.service';
import { ProductsService } from 'src/products/products.service';
import { SubscribesRepository } from 'src/subscribes/subscribes.repository';
import { UsersRepository } from 'src/user/users.repository';
import { PaymentLog, PaymentStatus } from 'src/entities/paymentLog.entity';
import { User } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';
import * as nodemailer from 'nodemailer';

@Injectable()
export class CronService {
  private transporter: nodemailer.Transporter;
  constructor(
    private dataSource: DataSource,
    private readonly openSearchService: OpenSearchService,
    private readonly productService: ProductsService,
    private readonly subscribesRepository: SubscribesRepository,
    private readonly usersRepository: UsersRepository,
  ) {
    this.transporter = nodemailer.createTransport({
      pool: true,
      host: process.env.NODEMAILER_EMAIL_HOST,
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.NODEMAILER_EMAIL, // 발신자 이메일 주소
        pass: process.env.NODEMAILER_EMAIL_PASSWORD, // 발신자 이메일 비밀번호 (보안에 주의)
      },
    });
  }
  // openSearch 일관성 유지
  @Cron('0 0 */1 * * *')
  async syncSearch() {
    const getSearchAllData = await this.openSearchService.getSearchAll();
    const getProductsAllData = await this.productService.getProducts();

    const sortSearchData = getSearchAllData.sort((a, b) => a._id - b._id);
    const sortProductsData = getProductsAllData.sort((a, b) => a.id - b.id);

    const searchLength: number = sortSearchData.length;
    const productsLength: number = sortProductsData.length;
    let i = 0;
    let j = 0;
    const uploadArr: Array<{ id: number; productName: string }> = [];
    const deleteArr: Array<{ id: number }> = [];

    while (i < searchLength && j < productsLength) {
      if (sortSearchData[i]._id == sortProductsData[j].id) {
        i++;
        j++;
        continue;
      }

      if (sortSearchData[i]._id < sortProductsData[j].id) {
        deleteArr.push({ id: sortSearchData[i++]._id });
      } else {
        uploadArr.push({
          id: sortProductsData[j].id,
          productName: sortProductsData[j++].productName,
        });
      }
    }

    if (i == searchLength) {
      for (let k = j; k < productsLength; k++) {
        uploadArr.push({
          id: sortProductsData[k].id,
          productName: sortProductsData[k].productName,
        });
      }
    } else {
      for (let k = i; k < searchLength; k++) {
        deleteArr.push({ id: sortSearchData[k]._id });
      }
    }

    await this.openSearchService.uploadBulkSearch(uploadArr);
    await this.openSearchService.deleteBulkSearch(deleteArr);
    return;
  }

  @Cron('0 0 0 20 */1 *')
  async sendAllMail() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const product = '상황버섯주, 유자청주';
    const getAllSubscribeData =
      await this.subscribesRepository.getAllSubscribe();

    const messages = [];
    for (let i = 0; i < getAllSubscribeData.length; i++) {
      //js.naver.com 처리 추가 필요
      messages.push({
        to: getAllSubscribeData[i].user_email,
        from: process.env.NODEMAILER_EMAIL,
        subject: `${month}월 Drinkit 월간 구독 안내`,
        html: `이달의 상품: ${product}<br/>
              <div>Drinkit 특선 상품!!\n 잔여 포인트를 확인해주세요!!</div>
              <form action="${process.env.DRINKIT_SUBSCRIBE_URL}" method="GET">
              <button>페이지 바로 이동</button>
            </form>`,
      });
    }

    const requestCount = messages.length;
    while (this.transporter.isIdle() && messages.length) {
      const message = messages.shift();
      this.transporter.sendMail(message);
    }

    console.log(`전체 구독자 메일 발송 수량: ${requestCount}`);
    return;
  }

  @Cron('0 0 0 25 */1 *')
  async sendSelectMail() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const product = '상황버섯주, 유자청주';

    const getSendMailSubscribeData =
      await this.subscribesRepository.getSendMailSubscribe();

    const messages = [];
    for (let i = 0; i < getSendMailSubscribeData.length; i++) {
      messages.push({
        to: getSendMailSubscribeData[i].user_email,
        from: process.env.NODEMAILER_EMAIL,
        subject: `${month}월 Drinkit 월간 구독 포인트 부족 알림`,
        html: `이달의 상품: ${product}<br/>
            <div>Drinkit 특선 상품!!\n안녕하세요. 고객님\n이번달 구독 상품을 구매 신청하셨으나,\n포인트 잔액이 부족하여 알림 문자 발송드립니다.
            \n매월 1일 결제 예정이니 구매를 원하시면 그 전에 충전 부탁드립니다.</div>
            <form action="${process.env.DRINKIT_SUBSCRIBE_URL}" method="GET">
              <button>페이지 바로 이동</button>
            </form>`,
      });
    }

    const requestCount = messages.length;
    while (this.transporter.isIdle() && messages.length) {
      const message = messages.shift();
      this.transporter.sendMail(message);
    }

    console.log(`구독 포인트 확인 메일 발송 수량: ${requestCount}`);
    return;
  }

  // @Cron('0 0 */1 * *')
  @Cron('0 0 0 1 */1 *')
  async subscribes() {
    const getSelectSubscribeData =
      await this.subscribesRepository.getSelectSubscribe();
    try {
      await this.dataSource.transaction(async (manager) => {
        const paymentLogArray = [];
        const userIdArray = [];
        for (let i = 0; i < getSelectSubscribeData.length; i++) {
          paymentLogArray.push({
            userId: Number(getSelectSubscribeData[i].subscribe_userId),
            totalPrice: 0,
            storeId: 1,
            paidPoint: Number(process.env.DRINKIT_SUBSCRIBE_PRICE),
            manager,
            impUid: 'subscribe',
            address: getSelectSubscribeData[i].subscribe_address,
            status: PaymentStatus.READY,
          });
          userIdArray.push(Number(getSelectSubscribeData[i].subscribe_userId));
        }

        const usersData = await this.usersRepository
          .createQueryBuilder('user')
          .where('user.id IN (:...ids)', { ids: userIdArray })
          .getMany();

        for (let j = 0; j < usersData.length; j++) {
          usersData[j].point =
            Number(usersData[j].point) -
            Number(process.env.DRINKIT_SUBSCRIBE_PRICE);
        }

        await manager
          .createQueryBuilder()
          .insert()
          .into(PaymentLog)
          .values(paymentLogArray)
          .execute();

        await manager
          .createQueryBuilder()
          .insert()
          .into(User, [
            'id',
            'isAdmin',
            'email',
            'isPersonal',
            'point',
            'password',
          ])
          .values(usersData)
          .orUpdate(['point'], ['id'], {
            skipUpdateIfNoValuesChanged: true,
          })
          .execute();
        return;
      });
    } catch (err) {
      console.log(err);
      return;
    }
  }
}
