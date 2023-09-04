import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import CreateCategoryDTO from './DTO/create.category.DTO';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiOperation({ summary: '카테고리 조회' })
  @Get('')
  async getAllCategory() {
    const categories = await this.categoryService.getAllCategory();

    return categories;
  }

  @Post()
  async createCategory(@Body() body: CreateCategoryDTO) {
    const result = await this.categoryService.createCategory(body);
    return result;
  }

  @Delete(':categoryId')
  async removeCategory(@Param('categoryId', ParseIntPipe) id: number) {
    this.categoryService.deleteCategory(id);
    return;
  }
}
