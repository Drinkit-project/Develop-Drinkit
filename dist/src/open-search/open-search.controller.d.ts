import { OpenSearchService } from './open-search.service';
export declare class OpenSearchController {
    private readonly openSearchService;
    constructor(openSearchService: OpenSearchService);
    getSearch(keyword: string): Promise<any>;
}
