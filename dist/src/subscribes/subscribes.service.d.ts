import { SubscribesRepository } from './subscribes.repository';
export declare class SubscribesService {
    private subscribesRepository;
    constructor(subscribesRepository: SubscribesRepository);
    postSubscribe(userId: number, isPaid: boolean, address: string): Promise<import("typeorm").InsertResult>;
    getSubscribe(userId: number): Promise<import("../entities/subscribe.entity").Subscribe>;
    updateSubscribe(userId: number, isPaid: boolean, address: string): Promise<import("typeorm").UpdateResult>;
    deleteSubscribe(userId: number): Promise<import("typeorm").DeleteResult>;
}
