import { SubscribesService } from './subscribes.service';
import { SubscribesReqDto } from './dto/subscribes.request.dto';
export declare class SubscribesController {
    private subscribesService;
    constructor(subscribesService: SubscribesService);
    postSubscribe(user: any, dto: SubscribesReqDto): Promise<import("typeorm").InsertResult>;
    getSubscribe(user: any): Promise<import("../entities/subscribe.entity").Subscribe>;
    updateSubscribe(user: any, dto: SubscribesReqDto): Promise<import("typeorm").UpdateResult>;
    deleteSubscribe(user: any): Promise<import("typeorm").DeleteResult>;
}
