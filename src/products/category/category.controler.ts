import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import CreateCategoryDTO from './DTO/create.category.DTO';
import { AuthGuard } from 'src/auth/security/jwt.guard';
import { AdminUser } from 'src/commons/decorators/user.decorators';
import { User } from 'src/entities/user.entity';

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
  @UseGuards(AuthGuard)
  async createCategory(
    @Body() body: CreateCategoryDTO,
    @AdminUser() user: User,
  ) {
    const result = await this.categoryService.createCategory(body);
    return result;
  }

  @Delete(':categoryId')
  @UseGuards(AuthGuard)
  async removeCategory(
    @Param('categoryId', ParseIntPipe) id: number,
    @AdminUser() user: User,
  ) {
    this.categoryService.deleteCategory(id);
    return;
  }
}
