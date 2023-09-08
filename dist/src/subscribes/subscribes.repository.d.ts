import { Subscribe } from 'src/entities/subscribe.entity';
import { DataSource, Repository } from 'typeorm';
export declare class SubscribesRepository extends Repository<Subscribe> {
    private datasource;
    constructor(datasource: DataSource);
    postSubscribe(userId: number, isPaid: boolean, address: string): Promise<import("typeorm").InsertResult>;
    getSubscribe(userId: number): Promise<Subscribe>;
    getAllSubscribe(): Promise<any[]>;
    getSelectSubscribe(): Promise<any[]>;
    getSendMailSubscribe(): Promise<any[]>;
    updateSubscribe(userId: number, isPaid: boolean, address: string): Promise<import("typeorm").UpdateResult>;
    deleteSubscribe(userId: number): Promise<import("typeorm").DeleteResult>;
}
