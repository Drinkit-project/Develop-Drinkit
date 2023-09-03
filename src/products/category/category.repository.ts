import { Injectable } from '@nestjs/common';
import { Category } from 'src/entities/category.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(private datasource: DataSource) {
    super(Category, datasource.createEntityManager());
  }

  async getAllCategory() {
    const categories = await this.createQueryBuilder('category').getMany();

    return categories;
  }
}
