import { Injectable } from '@nestjs/common';
import { SubscribesRepository } from './subscribes.repository';
@Injectable()
export class SubscribesService {
  constructor(private subscribesRepository: SubscribesRepository) {}

  async postSubscribe(userId: number, isPaid: boolean) {
    const postSubscribeData = await this.subscribesRepository.postSubscribe(
      userId,
      isPaid,
    );

    return postSubscribeData;
  }

  async deleteSubscribe(subscribeId: number) {
    const deletesubscribeData = await this.subscribesRepository.deleteSubscribe(
      subscribeId,
    );

    return deletesubscribeData;
  }
}
