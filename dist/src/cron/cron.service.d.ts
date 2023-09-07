import { OpenSearchService } from 'src/open-search/open-search.service';
import { ProductsService } from 'src/products/products.service';
import { SubscribesRepository } from 'src/subscribes/subscribes.repository';
import { UsersRepository } from 'src/user/users.repository';
import { DataSource } from 'typeorm';
export declare class CronService {
    private dataSource;
    private readonly openSearchService;
    private readonly productService;
    private readonly subscribesRepository;
    private readonly usersRepository;
    private transporter;
    constructor(dataSource: DataSource, openSearchService: OpenSearchService, productService: ProductsService, subscribesRepository: SubscribesRepository, usersRepository: UsersRepository);
    syncSearch(): Promise<void>;
    sendAllMail(): Promise<void>;
    sendSelectMail(): Promise<void>;
    subscribes(): Promise<void>;
}
