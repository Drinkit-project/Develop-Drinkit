import { BadRequestException, Injectable } from '@nestjs/common';
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

  async createCategory(data: object) {
    try {
      const result = await this.createQueryBuilder('category')
        .insert()
        .into(Category)
        .values(data)
        .execute();
      return result;
    } catch (e) {
      throw new BadRequestException('중복된 카테고리입니다.');
    }
  }

  deleteCategory(id: number) {
    return this.createQueryBuilder('category')
      .delete()
      .where('id=:id', { id })
      .execute();
  }
}
