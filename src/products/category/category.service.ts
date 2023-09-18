import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import CreateCategoryDTO from './DTO/create.category.DTO';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async getAllCategory() {
    const categories = await this.categoryRepository.getAllCategory();
    return categories;
  }

  createCategory(data: CreateCategoryDTO) {
    return this.categoryRepository.createCategory(data);
  }

  deleteCategory(id: number) {
    return this.categoryRepository.deleteCategory(id);
  }
}
