import { Injectable } from '@nestjs/common';
import { SubscribesRepository } from './subscribes.repository';

@Injectable()
export class SubscribesService {
  constructor(private subscribesRepository: SubscribesRepository) {}
  async postSubscribe(isPaid: boolean) {
    await this.subscribesRepository.insert({
      isPaid,
    });

    return '구독이 완료되었습니다.';
  }

  async deleteSubscribe(subscribeId: number) {
    await this.subscribesRepository.delete(subscribeId);

    return '구독이 취소되었습니다.';
  }
}
