import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiOperation({ summary: '카테로기 조회' })
  @Get('')
  async getAllCategory() {
    const categories = await this.categoryService.getAllCategory();

    return categories;
  }
}
