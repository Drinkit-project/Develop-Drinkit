import { CategoryRepository } from './category.repository';
import CreateCategoryDTO from './DTO/create.category.DTO';
export declare class CategoryService {
    private categoryRepository;
    constructor(categoryRepository: CategoryRepository);
    getAllCategory(): Promise<import("../../entities/category.entity").Category[]>;
    createCategory(data: CreateCategoryDTO): Promise<import("typeorm").InsertResult>;
    deleteCategory(id: number): Promise<import("typeorm").DeleteResult>;
}
