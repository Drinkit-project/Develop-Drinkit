export declare class RedisService {
    hgetall(key: string): Promise<{
        [key: string]: string;
    }>;
    updateRanking(productIdList: Array<number>, countList: Array<number>, isAdd: boolean): Promise<void>;
    getRanking(): Promise<{
        [key: string]: string;
    }>;
}
