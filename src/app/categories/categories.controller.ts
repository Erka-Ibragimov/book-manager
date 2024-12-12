import { Controller, Get, HttpException } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiResponse } from '@nestjs/swagger';
import { CategoryTagResponse } from 'src/api-response/category-tag-response';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @ApiResponse({ status: 200, type: CategoryTagResponse, isArray: true })
  @Get()
  async getAll() {
    try {
      return await this.categoriesService.getAll();
    } catch {
      throw new HttpException('Server error', 500);
    }
  }
}
