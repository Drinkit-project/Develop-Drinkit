import { ConfigService } from '@nestjs/config';
export declare class OpenSearchService {
    private readonly configService;
    private readonly client;
    constructor(configService: ConfigService);
    uploadSearch(productId: number, productName: string): Promise<import("@opensearch-project/opensearch").ApiResponse<Record<string, any>, unknown>>;
    uploadBulkSearch(document: Array<{
        id: number;
        productName: string;
    }>): Promise<import("@opensearch-project/opensearch/lib/Helpers").BulkStats>;
    getSearch(keyword: string): Promise<any>;
    getSearchAll(): Promise<any>;
    deleteSearch(productId: number): Promise<import("@opensearch-project/opensearch").ApiResponse<Record<string, any>, unknown>>;
    deleteBulkSearch(document: Array<{
        id: number;
    }>): Promise<import("@opensearch-project/opensearch/lib/Helpers").BulkStats>;
}
