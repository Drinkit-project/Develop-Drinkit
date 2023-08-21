import { Injectable, NotFoundException } from '@nestjs/common';
import { SubscribesRepository } from './subscribes.repository';
@Injectable()
export class SubscribesService {
  constructor(private subscribesRepository: SubscribesRepository) {}

  async postSubscribe(userId: number, isPaid: boolean) {
    const getSubscribeData = await this.subscribesRepository.getSubscribe(
      userId,
    );
    console.log(getSubscribeData);
    if (getSubscribeData != null) {
      throw new NotFoundException('이미 구독 중입니다.');
    }
    const postSubscribeData = await this.subscribesRepository.postSubscribe(
      userId,
      isPaid,
    );

    return postSubscribeData;
  }

  async getSubscribe(userId: number) {
    const getSubscribeData = await this.subscribesRepository.getSubscribe(
      userId,
    );

    return getSubscribeData;
  }

  async updateSubscribe(userId: number) {
    const getSubscribeData = await this.subscribesRepository.getSubscribe(
      userId,
    );
    let isPaid: boolean;
    if (getSubscribeData.isPaid) {
      isPaid = false;
    } else {
      isPaid = true;
    }

    const postSubscribeData = await this.subscribesRepository.updateSubscribe(
      userId,
      isPaid,
    );

    return postSubscribeData;
  }

  async deleteSubscribe(userId: number) {
    const deletesubscribeData = await this.subscribesRepository.deleteSubscribe(
      userId,
    );

    return deletesubscribeData;
  }
}
