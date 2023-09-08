import { CategoryService } from './category.service';
import CreateCategoryDTO from './DTO/create.category.DTO';
import { User } from 'src/entities/user.entity';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    getAllCategory(): Promise<import("../../entities/category.entity").Category[]>;
    createCategory(body: CreateCategoryDTO, user: User): Promise<import("typeorm").InsertResult>;
    removeCategory(id: number, user: User): Promise<void>;
}
