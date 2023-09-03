import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async getAllCategory() {
    const categories = await this.categoryRepository.getAllCategory();
    return categories;
  }
}
