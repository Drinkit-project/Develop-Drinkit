import { Category } from 'src/entities/category.entity';
import { DataSource, Repository } from 'typeorm';
export declare class CategoryRepository extends Repository<Category> {
    private datasource;
    constructor(datasource: DataSource);
    getAllCategory(): Promise<Category[]>;
    createCategory(data: object): Promise<import("typeorm").InsertResult>;
    deleteCategory(id: number): Promise<import("typeorm").DeleteResult>;
}
